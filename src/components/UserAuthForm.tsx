import { useState } from 'react'
import LoginForm from './LoginForm'
import SigninForm from './SigninForm'

const UserAuthForm = () => {
  const [formType, setFormType] = useState(true)

  if (formType) {
    return <LoginForm	formType={formType}	setFormType={setFormType} />
  } else {
    return <SigninForm formType={formType}	setFormType={setFormType} />
  }
}
export default UserAuthForm
