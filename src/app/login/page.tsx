'use client'

import LoginForm from '@/components/LoginForm'
import '../../sass/LoginPage.scss'
import { useAuthContext } from '@/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

const LoginPage = () => {
  const { user } = useAuthContext()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      console.log('User Logged Out')
    } catch (error) {
      console.log(error)
    }
  }

  return (
		<div className='LoginPage'>
			{!user ? <LoginForm /> : <button onClick={handleSignOut}>Log out</button>	}
		</div>
  )
}
export default LoginPage
