'use client'

import { useAuthContext } from '@/AuthContext'
import { signOut } from 'firebase/auth'
import LoginForm from '@/components/LoginForm'
import { auth } from '@/lib/firebase'
import '../../sass/Profile.scss'

const Profile = () => {
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
		<div className='profile'>
      {!user && <LoginForm /> }

      {user &&
      <div>
        <h3>User Info</h3>
        <p>Nombre: {user.displayName}</p>
        <p>Email: {user.email}</p>
        <p>Verificado: {user.emailVerified ? 'Sí' : 'No'}</p>

        <button onClick={handleSignOut}>Log out</button>
      </div>
      }
		</div>
  )
}
export default Profile
