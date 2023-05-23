'use client'

import { useAuthContext } from '@/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import '../../sass/Profile.scss'
import UserAuthForm from '@/components/UserAuthForm'

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
      {!user
        ? <UserAuthForm />
        : <div>
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
