import Btn from './Core/Btn';
import Input from './Core/Input';
import { IconSearch, IconShoppingCart } from '@tabler/icons-react';

interface Props {
    hiddeFn: () => void
}
export default function Navbar({ hiddeFn }: Props) {

    const navLinks: { name: string, href: string }[] = [
        { name: 'Home', href: '' },
        { name: 'Features', href: '' },
        { name: 'Categories', href: '' },
    ]

    return (
        <nav className='bg-[#25262b] z-10 bg-opacity-50 backdrop-blur w-full rounded-lg p-2 flex justify-between'>
            <div className='flex items-center gap-3'>
                <div className='rounded-lg w-8 aspect-square bg-dv flex justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#121316" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clip-rule="evenodd" />
                    </svg>
                </div>
                {
                    navLinks.map(({ name, href }) => {
                        return (
                            <Btn asChild variant='cart'>
                                <a href={href} className=' brightness-50 hover:brightness-125'>
                                    {name}
                                </a>
                            </Btn>
                        )
                    })
                }
            </div>

            <div className='flex gap-2'>
                <Btn onClick={hiddeFn} variant='cart'><IconShoppingCart size={20} /></Btn>
                <form action="" className='flex gap-1'>
                    <Input variant='search' />
                    <Btn variant='cart' type='submit'><IconSearch size={20} /></Btn>
                </form>
            </div>
        </nav>

    )
}