import Image from 'next/image'
import '../sass/Header.scss'

const Logo = () => {
  return (
    <Image className='logo' src={require('../img/logo.png')} alt='logo eventik'/>
  )
}

export default Logo
