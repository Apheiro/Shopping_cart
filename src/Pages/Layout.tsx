import React from 'react';
import { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import Navbar from '../Components/Navbar'
import SideMenu from '../Components/SideMenu'
import Footer from '../Components/Footer';

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const [hidde, setHidde] = useState(true)
  const wide = useMediaQuery('(min-width: 660px)')

  return (
    <div className="bg-db min-h-screen flex-col flex items-start ">
      <header className='fixed flex w-full left-0 top-4 px-4'>
        <Navbar variant={wide ? 'large' : 'small'} hiddeFn={() => { setHidde(!hidde) }} />
      </header>
      <div id='sideMenu'>
        <div className={`${hidde && 'hidden'} z-10 bg-black w-screen h-screen fixed left-0 top-0 bg-opacity-20`} onClick={() => { setHidde(!hidde) }} />
        <SideMenu variant={wide ? 'cart' : 'navSection'} hidde={hidde} setHidde={setHidde} />
      </div>
      <main className='w-full flex flex-col'>
        {children}
      </main>
      <Footer />
    </div>
  )
}


