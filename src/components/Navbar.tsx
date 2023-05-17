import React from 'react'
import '../sass/Navbar.scss'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMagnifyingGlass, faHeart, faTicket, faUser } from '@fortawesome/free-solid-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const Navbar = () => {
  const links = [
    { label: <FontAwesomeIcon icon={faHome}/>, url: '/' },
    { label: <FontAwesomeIcon icon={faMagnifyingGlass}/>, url: '/find' },
    { label: <FontAwesomeIcon icon={faHeart}/>, url: '/favorites' },
    { label: <FontAwesomeIcon icon={faTicket}/>, url: '/tickets' },
    { label: <FontAwesomeIcon icon={faUser}/>, url: '/profile' }
  ]
  return (
		<nav className='navbar'>
			<ul>
				{links.map(({ label, url }) => (
					<Link
					key={url}
					href={url}
					>
						<li>{label}</li>
					</Link>
				))}
			</ul>
		</nav>
  )
}

export default Navbar
