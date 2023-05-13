import React from 'react'
import { Barlow_Condensed } from 'next/font/google'
import '../sass/Globals.scss'
import Header from '@/components/Header'

const BarlowCondensed = Barlow_Condensed({ subsets: ['latin'], weight: '400' })

export const metadata = {
  title: 'Eventik',
  description: 'La vida de los bares'
}

export default function RootLayout ({ children }: {children: React.ReactNode}) {
  return (
		<html lang='es'>
			<body className={BarlowCondensed.className}>
				<Header />
				{children}
			</body>
		</html>
  )
}
