'use client'

import { auth } from '@/lib/firebase'
import { facebookProvider, googleProvider } from '@/lib/firebase/auth'
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth'
import React, { useRef } from 'react'
import Image from 'next/image'
import logoGooge from '../img/login-svg/google.svg'
import logoFacebook from '../img/login-svg/facebook.svg'

const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const handleSignIn = async () => {
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    if (!email || !password) return

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      if (userCredential.user) {
        if (!userCredential.user.emailVerified) await sendEmailVerification(userCredential.user)
      }
    } catch (error) {
      console.log(error)
    }

    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = ''
      passwordRef.current.value = ''
    }
  }

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    if (!email || !password) return
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.log(error)
    }

    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = ''
      passwordRef.current.value = ''
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithRedirect(auth, googleProvider)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFacebookLogin = async () => {
    try {
      await signInWithRedirect(auth, facebookProvider)
    } catch (error) {
      console.log(error)
    }
  }

  return (
	<>
		<form onSubmit={handleLogIn}>
			<input ref={emailRef} name='email' type='email' required placeholder='Email'/>
			<input ref={passwordRef} name='password' type='password' required placeholder='Password' />
			<button type='submit' className='login-btn'>Log in</button>
		</form>
			<button onClick={handleSignIn}>Sing in with email</button>
			<button onClick={handleGoogleLogin}>
        <Image src={logoGooge} alt='logo google' width={30}/>
        Sign in with Google
      </button>
			<button onClick={handleFacebookLogin}>
        <Image src={logoFacebook} alt='logo facebook' width={30}/>
        Sign in with Facebook
      </button>

	</>
  )
}
export default LoginForm
