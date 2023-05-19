'use client'

import { auth } from '@/lib/firebase'
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useRef } from 'react'

const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const handleSignIn = async () => {
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    if (!email || !password) return

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log('user created: ', userCredential)
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log('user created: ', userCredential)
    } catch (error) {
      console.log(error)
    }

    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = ''
      passwordRef.current.value = ''
    }
  }

  return (
	<>
		<form onSubmit={handleLogIn}>
			<input ref={emailRef} name='email' type='email' required placeholder='Email'/>
			<input ref={passwordRef} name='password' type='password' required placeholder='Password' />
			<button type='submit'>Log in</button>
		</form>
			<button onClick={handleSignIn}>Sing in</button>

	</>
  )
}
export default LoginForm
