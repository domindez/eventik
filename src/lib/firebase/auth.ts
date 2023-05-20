import { GoogleAuthProvider } from 'firebase/auth'
import { auth } from '.'

auth.languageCode = 'es'
export const googleProvider = new GoogleAuthProvider()
