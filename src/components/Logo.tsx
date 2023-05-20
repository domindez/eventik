import Image from 'next/image'
import '../sass/Header.scss'
import logo from '../img/logo.png'

const Logo = () => {
  return (
    <Image
    className='logo'
    src={logo}
    alt='logo eventik'
    priority={true} />
  )
}

export default Logo
