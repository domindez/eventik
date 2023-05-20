/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import { auth } from '@/lib/firebase'
import { googleProvider } from '@/lib/firebase/auth'
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signInWithRedirect, updateProfile } from 'firebase/auth'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import logoGooge from '../img/login-svg/google.svg'
import { FirebaseError } from 'firebase/app'

const LoginForm = () => {
  const [loginform, setLoginForm] = useState(true)
  const [error, setError] = useState('')
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const repeatPasswordRef = useRef<HTMLInputElement | null>(null)

  const handleAuthError = (error: FirebaseError) => {
    const errorCode = error.code
    switch (errorCode) {
      case 'auth/email-already-in-use':
        setError('Ese correo ya está en uso')
        break
      case 'auth/wrong-password':
        setError('Contraseña incorrecta')
        break
      case 'auth/user-not-found':
        setError('El usuario no existe')
        break
      default:
        setError('Ha ocurrido un error desconocido.')
        break
    }
  }

  const clearFields = () => {
    emailRef.current!.value = ''
    passwordRef.current!.value = ''
    if (repeatPasswordRef.current) repeatPasswordRef.current.value = ''
    if (nameRef.current) nameRef.current.value = ''
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = nameRef.current?.value
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    const repeatPassword = repeatPasswordRef.current?.value
    if (!email || !password) return
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    if (password !== repeatPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name })
        if (!userCredential.user.emailVerified) await sendEmailVerification(userCredential.user)
        clearFields()
      }
    } catch (error) {
      handleAuthError(error as FirebaseError)
    }
  }

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    if (!email || !password) return
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
      clearFields()
    } catch (error) {
      handleAuthError(error as FirebaseError)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithRedirect(auth, googleProvider)
    } catch (error) {
      console.log(error)
    }
  }

  const changeForm = () => {
    setLoginForm(!loginform)
    setError('')
    clearFields()
  }

  if (loginform) {
    return (
      <>
        <form onSubmit={handleLogIn}>
        <input ref={emailRef} name='email' type='email' required placeholder='Email'/>
          <input ref={passwordRef} name='password' type='password' required placeholder='Password' />
          <p>{error && error}</p>
          <button type='submit' className='login-btn'>Log in</button>
        </form>

        <hr />
        <button onClick={handleGoogleLogin}>
          <Image src={logoGooge} alt='logo google' width={30}/>
          Continuar con Google
        </button>
        <button onClick={changeForm}>Crear una cuenta</button>
      </>
    )
  } else {
    return (
      <>
        <form onSubmit={handleSignIn}>
          <input ref={nameRef} name='name' type='text' required placeholder='Nombre'/>
          <input ref={emailRef} name='email' type='email' required placeholder='Email'/>
          <input ref={passwordRef} name='password' type='password' required placeholder='Password' />
          <input ref={repeatPasswordRef} name='repeatPassword' type='password' required placeholder='Repetir password' />
          <p>{error && error}</p>
          <button type='submit' className='login-btn'>Crear cuenta</button>
        </form>
        <hr />
        <button onClick={handleGoogleLogin}>
          <Image src={logoGooge} alt='logo google' width={30}/>
          Continuar con Google
        </button>
        <button onClick={changeForm}>Ya tengo cuenta</button>
      </>
    )
  }
}
export default LoginForm
