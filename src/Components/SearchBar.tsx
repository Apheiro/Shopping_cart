import { Radios, Btn, Input } from "./Core/Exports";
import { IconSearch, IconChevronLeft, IconSettingsSearch } from '@tabler/icons-react';
import { useNavigate, useLocation, useLoaderData } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import queryString from 'query-string';
interface Props {
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>
}

function SearchBar({ setShowSearch }: Props) {
    const [showSearchSettings, setShowSearchSettings] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const searchInputRef = useRef<HTMLInputElement>(null);
    const defaultValue: string = new URLSearchParams(location.search).get('type') ?? 'hardgood';
    const containerFormRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (searchInputRef.current) searchInputRef.current.focus();
    }, [])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setShowSearch(false);
        const formData = new FormData(e.target as HTMLFormElement);
        const paramsObject = queryString.parse(location.search);
        const { q, pg, type, ...paramsFilter } = paramsObject as any;
        const query = formData.get('q')?.toString().replace(/[^a-zA-Z0-9\s]+/g, '');
        const types = formData.get('type') ?? 'hardgood';
        const searchParams = queryString.stringify(paramsFilter);
        if (query) { navigate(`/search?q=${query}&type=${types}&pg=1&${searchParams ?? ''}`) }
    }

    return (

        <motion.div
            ref={containerFormRef}
            className={`z-10 fixed left-1/2 top-1/2 min-w-90`}
            initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 1.1, x: '-50%', y: '-50%' }}
            transition={{ duration: 0.25 }}
        >
            <motion.form
                action="GET"
                onSubmit={handleSubmit}
                className="bg-neutral-2 dark:(bg-dbm) h-15 rounded-lg flex flex-col gap-3 overflow-hidden"
                animate={{ height: showSearchSettings ? 'auto' : '59px' }}
                transition={{ duration: 0.25, type: 'spring', stiffness: 100, damping: 17 }}
            >
                <div className="flex gap-3 m-3 mb-0">
                    <Btn variant='cart' onClick={() => setShowSearch(false)}>
                        <IconChevronLeft size={20} />
                    </Btn>
                    <Input
                        ref={searchInputRef}
                        variant='search'
                        name='q'
                        id='inputSearch'
                    />
                    <Btn variant='cart' type='submit'>
                        <IconSearch size={20} />
                    </Btn>
                    <Btn variant='cart' onClick={() => setShowSearchSettings(!showSearchSettings)} type='button'>
                        <IconSettingsSearch size={20} />
                    </Btn>
                </div>

                <div className="flex flex-col gap-3 m-3 mt-0">
                    <Radios variantStyle="compact" value="hardgood" Title="Products" name="type" radioSelectedDefault={defaultValue} />
                    <Radios variantStyle="compact" value="blackTie" Title="Warranty services" name="type" radioSelectedDefault={defaultValue} />
                    <Radios variantStyle="compact" value="game" Title="Games" name="type" radioSelectedDefault={defaultValue} />
                    <Radios variantStyle="compact" value="music" Title="Music" name="type" radioSelectedDefault={defaultValue} />
                    <Radios variantStyle="compact" value="movie" Title="Movies" name="type" radioSelectedDefault={defaultValue} />
                    <Radios variantStyle="compact" value="software" Title="Software" name="type" radioSelectedDefault={defaultValue} />
                </div>
            </motion.form>
        </motion.div>

    )
}

export { SearchBar }