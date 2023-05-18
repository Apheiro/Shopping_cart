import { ProductCard } from './Core/Exports';
// import React, { useState } from 'react';
// import { useKeenSlider } from "keen-slider/react"
// import Btn from './Core/Btn';
// import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';



type Product = { img: string, title: string, price: number, oldPrice?: number }

interface Props {
    products: Product[]
}

function ProductsCarousel({ products }: Props) {
    // const [currentSlide, setCurrentSlide] = useState(0)
    // const [loaded, setLoaded] = useState(false)
    // const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    //     slides: {
    //         perView: 6,
    //         spacing: 15
    //     },
    //     initial: 0,
    //     slideChanged(slider) { setCurrentSlide(slider.track.details.rel) },
    //     created() { setLoaded(true) },
    // })

    // function Arrow(props: { disabled: boolean, left?: boolean, onClick: (e: any) => void, }) {
    //     const { disabled, left, onClick } = props
    //     return (
    //         <Btn variant='cart' classNameCustom={`absolute !opacity-100 top-1/2 translate-y--1/2 ${disabled && 'text-opacity-50'} ${left ? "left-1" : "left-auto right-1"}`} onClick={onClick}>
    //             {left ? <IconChevronLeft size={30} /> : <IconChevronRight size={30} />}
    //         </Btn>
    //     )
    // }

    return (
        <>
            <div className='flex max-w-308 pb-2 overflow-x-auto scrollbar w-full'>
                {
                    products.map(({ img, title, price, oldPrice }, index) =>
                        <ProductCard key={`productCarousel-${index}`} customClass={` ${index === 0 && 'ml-4 sm:!ml-0' || index === products.length - 1 && 'mr-4 sm:!mr-0'}`} img={img} title={title} price={price} oldPrice={oldPrice} />
                    )
                }
            </div>

            {/* <div className="navigation-wrapper relative max-w-2xl">
                <div ref={sliderRef} className="keen-slider">
                    {
                        products.map(({ img, title, price, oldPrice }, index) =>
                            <div key={`productCarousel-${index}`} className={`keen-slider__slide number-slide${index + 1}`}>
                                <ProductCard img={img} title={title} price={price} oldPrice={oldPrice} />
                            </div>
                        )
                    }
                </div>
                {
                    loaded && instanceRef.current && (
                        <>
                            <Arrow left onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()} disabled={currentSlide === 0} />
                            <Arrow onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()} disabled={currentSlide === instanceRef.current.track.details.slides.length - 1} />
                        </>
                    )
                }
            </div> */}
        </ >
    )


}

export { ProductsCarousel }