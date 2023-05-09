import Layout from './Layout';
import { Start } from '../Components/Exports';

export default function Root() {

    return (
        <Layout>
            <div className='flex flex-col gap-5 sm:gap-30'>
                <section className='h-screen p-4' >
                    <Start />
                </section>
            </div>
        </Layout>
    )
}


