import Image from 'next/image'
import '../sass/Header.scss'
import logo from '../img/logo.png'

const Logo = () => {
  return (
    <Image className='logo' src={logo} alt='logo eventik'/>
  )
}

export default Logo
