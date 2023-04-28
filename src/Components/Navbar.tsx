import Btn from './Core/Btn';
import Input from './Core/Input';
import { IconSearch, IconShoppingCart, IconMenu2 } from '@tabler/icons-react';

interface Props {
    hiddeFn: () => void,
    variant: 'small' | 'large'
}
export default function Navbar({ hiddeFn, variant }: Props) {
    const navLinks: { name: string, href: string }[] = [
        { name: 'Home', href: '/Home#' },
        { name: 'Features', href: '/Features#' },
        { name: 'Categories', href: '/Categories#' },
    ]

    return (
        <nav className='flex justify-between bg-[#25262b] z-10 bg-opacity-50 backdrop-blur max-w-5xl w-full mx-auto rounded-lg p-2  '>
            {
                variant === 'large' &&
                <>
                    <div className='flex items-center gap-3'>
                        <div className='rounded-lg w-8 aspect-square bg-dv flex justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#121316" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                            </svg>
                        </div>
                        {
                            navLinks.map(({ name, href }) => {
                                return (
                                    <Btn asChild variant='cart' key={name}>
                                        <a href={href}>{name}</a>
                                    </Btn>
                                )
                            })
                        }
                    </div>
                    <div className='flex gap-2'>
                        <Btn onClick={hiddeFn} variant='cart'><IconShoppingCart size={20} /></Btn>
                        <form action="" className='flex bg-neutral-500 bg-opacity-10 rounded-lg'>
                            <Input variant='search' />
                            <Btn variant='cart' type='submit'><IconSearch size={20} /></Btn>
                        </form>
                    </div>
                </>
            }
            {
                variant === 'small' &&
                <>
                    <div className='flex items-center gap-3'>
                        <div className='rounded-lg w-8 aspect-square bg-dv flex justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#121316" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                            </svg>
                        </div>

                    </div>

                    <form action="" className='flex bg-neutral-500 bg-opacity-10 rounded-lg'>
                        <Input variant='search' />
                        <Btn variant='cart' type='submit'><IconSearch size={20} /></Btn>
                    </form>

                    <Btn onClick={hiddeFn} variant='cart'><IconMenu2 size={20} /></Btn>
                </>
            }
        </nav>

    )
}