'use client'

import LoginForm from '@/components/LoginForm'
import '../../sass/LoginPage.scss'
import { useAuthContext } from '@/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '@/logic/firebase'

const LoginPage = () => {
  const { user }: any = useAuthContext()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      console.log('User Logged Out')
    } catch (error) {
      console.log(error)
    }
  }

  console.log(user)
  return (
		<div className='LoginPage'>
			{!user ? <LoginForm /> : <button onClick={handleSignOut}>Log out</button>	}
		</div>
  )
}
export default LoginPage
