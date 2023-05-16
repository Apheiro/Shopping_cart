import Layout from './Layout';
import { Categories } from '../Components/Exports';

export default function ErrorPage() {
    return (
        <div className='min-h-screen p-4 pt-100px sm:mt-0 flex flex-col justify-center items-center gap-10'>
            <div>
                <h2 className='text-lg font-bold'>Oops! This page does not exist, probably the link is incorrect. Try clicking in our categories or go back.</h2>
            </div>
            <Categories />
        </div>
    )
}