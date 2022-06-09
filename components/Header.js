import { useContext } from 'react'
import Link from 'next/link'
import Navbar from './Navbar'

export default function Header() {

  return (
    <header className='sticky top-0 flex-none relative z-50 text-sm leading-6 font-medium ring-1 ring-gray-900 ring-opacity-5 shadow-md py-5 bg-white'>
      <nav className='container mx-auto px-4 sm:px-10 lg:px-20'>
        <div className='flex items-center flex-wrap sm:flex-nowrap'>
          <Link href='/'>
            <a className='flex-none mr-5'>
              <img src='/images/desktop/link-aja-red.png' className='h-10' />
            </a>
          </Link>
          <Link href='/'>
            <a className='flex-none'>
              <img src='/images/desktop/apa2bisa-red.png' className='h-8' />
            </a>
          </Link>
        </div>
      </nav>
    </header>
  )
}