import { useState, useEffect } from 'react';
import { Btn, Input } from './Core/Exports';
import { IconSearch, IconShoppingCart, IconMoonFilled, IconSunFilled } from '@tabler/icons-react';
import useMinScroll from '../hooks/useMinScroll';
import { useNavigate, useLocation, Link, useLoaderData } from 'react-router-dom';
import { useDidUpdate } from '@mantine/hooks';
interface Props {
    hiddeFn: () => void,
}

function Navbar({ hiddeFn }: Props) {
    const { darkModeOnLS } = useLoaderData() as { darkModeOnLS: boolean };

    const [handleInput, setHandleInput] = useState<string>('')
    const [darkModeOn, setDarkModeOn] = useState<boolean>(darkModeOnLS)
    const scroll = useMinScroll(50);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (darkModeOn) document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
    }, [])

    useDidUpdate(() => {
        if (darkModeOn) {
            localStorage.setItem('darkModShoppingCart', 'true')
            document.documentElement.classList.add('dark')
        } else {
            localStorage.setItem('darkModShoppingCart', '')
            document.documentElement.classList.remove('dark')
        }
    }, [darkModeOn])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const searchParams: URLSearchParams = new URLSearchParams(location.search);
        const excludedParams: string[] = ['q', 'pg'];
        let params: string[] = [];
        searchParams.forEach((value, key) => { if (!excludedParams.includes(key)) { params.push(`${key}=${value}`); } })
        const newSearchParams = new URLSearchParams(params.join('&'));
        if (handleInput) { navigate(`/search?q=${handleInput}&pg=1&${newSearchParams.toString()}`) }
    }

    return (
        <nav className={`${scroll ? ' bg-neutral-1/60 shadow-md dark:(bg-neutral-6/10)' : 'bg-neutral-3/20 dark:(bg-db/20)'} flex justify-between transition-[backgroundColor] transition-duration-500 backdrop-blur-lg max-w-5xl w-full mx-auto rounded-lg p-2 gap-2`}>
            <Btn asChild variant='base' classNameCustom={'!bg-dv/100 min-w-9 !aspect-square !p-0'}>
                <Link to="/" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#121316" className="w-6 h-6 fill-neutral-3 dark:( fill-db)">
                        <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                    </svg>
                </Link>
            </Btn>

            <form
                method="get"
                onSubmit={handleSubmit}
                className={`${scroll ? 'bg-neutral-1/60 dark:(bg-neutral-8/60)' : 'bg-neutral-1/50 dark:(bg-neutral-5/10)'} flex rounded-lg transition-colors transition-duration-300`}
            >
                <Input
                    variant='search'
                    name='q'
                    id='inputSearch'
                    onChange={(e) => setHandleInput(e.target.value)}
                />
                <Btn variant='cart' classNameCustom={'rounded-l-none'} type='submit'>
                    <IconSearch size={20} />
                </Btn>
            </form>

            <div className='flex gap-1'>
                <Btn onClick={() => { setDarkModeOn(!darkModeOn) }} variant='cart'>
                    {
                        darkModeOn ? <IconSunFilled size={20} /> : <IconMoonFilled size={20} />
                    }
                </Btn>
                <Btn onClick={hiddeFn} variant='cart'>
                    <IconShoppingCart size={20} />
                </Btn>
            </div>

        </nav>
    )
}

export { Navbar }