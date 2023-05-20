import { useState, useEffect } from 'react';
import { Navbar, SideMenu, Footer, SearchBar } from '../Components/Exports'
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigation } from 'react-router-dom';
import { IconLoader2 } from '@tabler/icons-react'
interface Props {
  children: React.ReactNode,
}

export default function Layout({ children }: Props) {
  const [showSideBar, setShowSideBar] = useState<boolean>(false)
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const isLoading = useNavigation().state === 'loading'

  useEffect(() => {
    if (showSideBar || showSearch) document.body.style.overflowY = 'hidden'
    else document.body.style.overflowY = 'unset'
  }, [showSideBar, showSearch])

  return (
    <div className="min-h-screen flex-col flex items-start ">
      <header key={'headerKey'} className='fixed flex w-full left-0 top-4 px-4 z-10'>
        <Navbar setShowSideBar={setShowSideBar} setShowSearch={setShowSearch} />
      </header>


      <AnimatePresence>
        {
          (showSideBar || showSearch) &&
          <motion.div
            className={`bg-black/20 w-screen h-screen fixed left-0 top-0 z-10`}
            onClick={() => {
              if (showSideBar) setShowSideBar(false)
              if (showSearch) setShowSearch(false)
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        }
      </AnimatePresence>

      <AnimatePresence>
        {showSideBar && <SideMenu key={'sideMenuKey'} setShowSideBar={setShowSideBar} />}
        {showSearch && <SearchBar key={'searchKey'} setShowSearch={setShowSearch} />}
      </AnimatePresence>


      <main className='w-full flex flex-col'>
        <div className='flex flex-col gap-5 sm:gap-30'>
          {children}
        </div>
      </main>

      <AnimatePresence>
        {
          isLoading &&
          <motion.div
            className='bg-neutral-5/20 p-3 backdrop-blur-lg rounded-lg fixed bottom-2 left-1/2 -translate-x-1/2 color-violet-5 z-10'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <IconLoader2 className='animate-spin' height={20} width={20} stroke={4} />
          </motion.div>
        }
      </AnimatePresence>
      <Footer />
    </div >
  )
}