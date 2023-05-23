import { clearFields, handleGoogleLogin, handleSignIn } from '@/lib/utils/login'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import logoGooge from '../img/login-svg/google.svg'

interface Props {
  formType: boolean
  setFormType: Dispatch<SetStateAction<boolean>>
}

const SigninForm = ({ formType, setFormType }: Props) => {
  const [error, setError] = useState('')

  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const repeatPasswordRef = useRef<HTMLInputElement | null>(null)

  const changeForm = () => {
    setFormType(!formType)
    setError('')
    clearFields([emailRef, passwordRef])
  }

  return (
		<>
		<form onSubmit={ handleSignIn(nameRef, emailRef, passwordRef, repeatPasswordRef, setError)
}>
			<input ref={nameRef} name='name' type='text' required placeholder='Nombre'/>
			<input ref={emailRef} name='email' type='email' required placeholder='Email'/>
			<input ref={passwordRef} name='password' type='password' required placeholder='Password' />
			<input ref={repeatPasswordRef} name='repeatPassword' type='password' required placeholder='Repetir password' />
			<button type='submit' className='login-btn'>Crear cuenta</button>
			<p>{error && error}</p>
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
export default SigninForm
