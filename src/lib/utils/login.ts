import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signInWithRedirect, updateProfile } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase'
import { googleProvider } from '../firebase/auth'

export const clearFields = (refs: Array<React.MutableRefObject<HTMLInputElement | null>>) => {
  refs.forEach(ref => {
    if (ref && ref.current) {
      ref.current.value = ''
    }
  })
}

export const handleAuthError = (error: FirebaseError) => {
  const errorCode = error.code
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return ('Ese correo ya está en uso')
    case 'auth/wrong-password':
      return ('Contraseña incorrecta')
    case 'auth/user-not-found':
      return ('El usuario no existe')
    default:
      return ('Ha ocurrido un error desconocido.')
  }
}

export const handleGoogleLogin = async () => {
  try {
    await signInWithRedirect(auth, googleProvider)
  } catch (error) {
    console.log(error)
  }
}

export const handleLogIn = (
  emailRef: React.MutableRefObject<HTMLInputElement | null>,
  passwordRef: React.MutableRefObject<HTMLInputElement | null>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  return async (e: React.FormEvent<HTMLFormElement>) => {
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
      clearFields([emailRef, passwordRef])
    } catch (error) {
      const errorMsg = handleAuthError(error as FirebaseError)
      setError(errorMsg)
    }
  }
}

export function handleSignIn (
  nameRef: React.MutableRefObject<HTMLInputElement | null>,
  emailRef: React.MutableRefObject<HTMLInputElement | null>,
  passwordRef: React.MutableRefObject<HTMLInputElement | null>,
  repeatPasswordRef: React.MutableRefObject<HTMLInputElement | null>,
  setError: React.Dispatch<React.SetStateAction<string>>
) {
  return async (e: React.FormEvent<HTMLFormElement>) => {
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
        if (!userCredential.user.emailVerified) { await sendEmailVerification(userCredential.user) }
        clearFields([nameRef, emailRef, passwordRef, repeatPasswordRef])
      }
    } catch (error) {
      const errorMsg = handleAuthError(error as FirebaseError)
      setError(errorMsg)
    }
  }
}
