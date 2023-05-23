import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import Image from 'next/image'
import logoGooge from '../img/login-svg/google.svg'
import { clearFields, handleGoogleLogin, handleLogIn } from '@/lib/utils/login'

interface Props {
  formType: boolean
  setFormType: Dispatch<SetStateAction<boolean>>
}

const LoginForm = ({ formType, setFormType }: Props) => {
  const [error, setError] = useState('')
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const changeForm = () => {
    setFormType(!formType)
    setError('')
    clearFields([emailRef, passwordRef])
  }

  return (
    <>
    <form onSubmit={handleLogIn(emailRef, passwordRef, setError)}>
      <input ref={emailRef} name='email' type='email' required placeholder='Email'/>
        <input ref={passwordRef} name='password' type='password' required placeholder='Password' />
        <button type='submit' className='login-btn'>Log in</button>
        <p>{error && error}</p>
      </form>

      <hr />
      <button onClick={handleGoogleLogin}>
        <Image src={logoGooge} alt='logo google' width={30}/>
        Continuar con Google
      </button>
      <button onClick={changeForm}>Crear una cuenta</button>
    </>
  )
}
export default LoginForm
