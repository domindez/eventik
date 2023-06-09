import React from 'react'
import { Barlow_Condensed } from 'next/font/google'
import '../sass/Globals.scss'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import { AuthContextProvider } from '@/AuthContext'

const BarlowCondensed = Barlow_Condensed({ subsets: ['latin'], weight: '400' })

export const metadata = {
  title: 'Eventik',
  description: 'La vida de los bares'
}

export default function RootLayout ({ children }: {children: React.ReactNode}) {
  return (
		<html lang='es'>
			<body className={BarlowCondensed.className}>
				<AuthContextProvider>
					<Header />
					<main>
						{children}
					</main>
					<Navbar />
				</AuthContextProvider>
			</body>
		</html>
  )
}
