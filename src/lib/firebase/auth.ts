import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '.'

auth.languageCode = 'es'
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()
// facebookProvider.addScope('email')
// facebookProvider.addScope('public_profile')
