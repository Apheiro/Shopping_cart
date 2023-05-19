import { useState, useEffect } from 'react';
import { Navbar, SideMenu } from '../Components/Exports'
import { Footer } from '../Components/Exports';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigation } from 'react-router-dom';
import { IconLoader2 } from '@tabler/icons-react'
interface Props {
  children: React.ReactNode,
}

export default function Layout({ children }: Props) {
  const [showElements, setShowElements] = useState<boolean>(false)
  const isLoading = useNavigation().state === 'loading'

  useEffect(() => {
    if (showElements) document.body.style.overflowY = 'hidden'
    else document.body.style.overflowY = 'unset'
  }, [showElements])

  return (
    <div className="min-h-screen flex-col flex items-start ">
      <header key={'headerKey'} className='fixed flex w-full left-0 top-4 px-4 z-10'>
        <Navbar hiddeFn={() => { setShowElements(!showElements) }} />
      </header>
      <AnimatePresence>
        {
          showElements &&
          <div id='sideMenu'>
            <motion.div
              className={`z-10 bg-black/20 w-screen h-screen fixed left-0 top-0`}
              onClick={() => { setShowElements(false) }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <SideMenu setShowElements={setShowElements} />
          </div>
        }
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