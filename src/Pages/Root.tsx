import Layout from './Layout';
import Start from '../Components/Start';
import Features from '../Components/Features';
import Categories from '../Components/Categories';
import { useMediaQuery } from '@mantine/hooks';

interface Props {
    children?: React.ReactNode
}

export default function Root({ children }: Props) {
    const wide = useMediaQuery('(min-width: 660px)')
    return (
        <Layout>
            <section className='h-screen px-4' >
                <Start />
            </section>
            <section className='h-screen min-h-screen flex items-center justify-center px-4 flex-col p-4'>
                <Features />
            </section>
            <section className='h-screen flex items-center justify-center p-4'>
                <Categories />
            </section>
        </Layout>
    )
}


