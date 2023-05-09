import Btn from './Core/Btn';
import Input from './Core/Input';
import { IconSearch, IconShoppingCart } from '@tabler/icons-react';
import useMinScroll from '../hook/useMinScroll';

interface Props {
    hiddeFn: () => void,
}

const Navbar = ({ hiddeFn }: Props) => {
    const scroll = useMinScroll(50);

    return (
        <nav className={`${scroll ? 'bg-[#31343c]' : 'bg-db'} flex justify-between transition-colors  bg-opacity-20 backdrop-blur-lg max-w-5xl w-full mx-auto rounded-lg p-2 transition-duration-500  `}>
            <Btn asChild variant='base' classNameCustom={'!bg-opacity-100 w-9 !aspect-square !p-0 hover:(filter brightness-120) '}>
                <a href="/" className='rounded-lg w-8 aspect-square bg-dv  flex justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#121316" className="w-6 h-6">
                        <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                    </svg>
                </a>
            </Btn>
            <form action="" className='flex bg-neutral-500 bg-opacity-10 rounded-lg'>
                <Input variant='search' />
                <Btn variant='cart' type='submit'><IconSearch size={20} /></Btn>
            </form>
            <Btn onClick={hiddeFn} variant='cart'><IconShoppingCart size={20} /></Btn>
        </nav>

    )
}

export default Navbar