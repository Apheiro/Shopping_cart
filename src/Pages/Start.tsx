import Btn from '../Components/Core/Btn'
import { useState } from 'react';
// import Spline from '@splinetool/react-spline';
import { unicProductTest } from '../a/requests';
interface Props {
    children?: React.ReactNode
}

export default function Start({ children }: Props) {
    const [load, setLoad] = useState<boolean>(false);
    return (
        <section className='flex justify-center items-center w-full h-screen p-4'>
            <div className='flex flex-col gap-4 max-w-xl'>
                <h1 className=' text-5xl sm:text-6xl text-transparent font-bold bg-clip-text bg-gradient-to-br from-purple-500 to-indigo-700'>
                    STREAMLINE YOUR<br />
                    SHOPPING!
                </h1>
                <p className=' text-justify'>
                    Simplify your online shopping with our easy-to-use cart. Browse products, add to your cart, and checkout with just a few clicks. Convenient shopping made simple.
                </p>
                <Btn classNameCustom='self-start' onClick={() => unicProductTest('6542964')} variant='shop'>SHOP NOW</Btn>
            </div>
            <div className='hidden lg:flex max-w-2xl w-full aspect-square justify-center items-center '>
                {/* {!load && 'loading'}
                <div className={load ? 'h-full w-full' : 'hidden'}>
                    <Spline scene="https://prod.spline.design/t6I0SUpZLTZL0iy7/scene.splinecode" onLoad={() => { setLoad(true) }} />
                </div> */}
            </div>

        </section>
    )
}
