import { useRouteError } from 'react-router-dom';

interface ErrorPageProps {
    status: number,
    statusText: string
    internal: boolean
    data: string
    error: {
        message: string
        name: string
    }
}

export default function ErrorPage() {
    const errorPage = useRouteError() as ErrorPageProps

    return (
        <div className='min-h-screen p-4 pt-100px sm:mt-0 flex flex-col justify-center items-center gap-10'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='font-extrabold text-40 text-neutral-2 dark:(text-violet-4) leading-30 text-shadow-md'>{errorPage.status}</h1>
                <p className='font-extrabold text-15 text-neutral-6 dark:(text-neutral-4)'>{errorPage.statusText || errorPage.error.message}</p>
            </div>
        </div>
    )
}