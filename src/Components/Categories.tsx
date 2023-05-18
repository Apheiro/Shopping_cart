import { CategoryBtn } from './Core/Exports'
import { useMediaQuery } from '@mantine/hooks';
import {
    IconDeviceTv, IconDeviceLaptop,
    IconDevices, IconDeviceGamepad,
    IconHeadphones, IconDeviceMobile,
    IconDeviceSpeaker, IconHome,
    IconHorseToy, IconDrone,
    IconCamera, IconDeviceWatch,
    IconFridge, IconTeapot,
    IconMovie, IconPrinter,
    IconCar, IconDiscount
} from '@tabler/icons-react'
type Category = { svg: React.ReactNode, title: string, link?: string }[]

function Categories() {
    const wide = useMediaQuery('(max-width: 935px)')

    const svgProps: { stroke: number, size: number } = {
        stroke: 1,
        size: wide ? 25 : 50
    }

    const categories: Category = [
        { svg: <IconDeviceTv {...svgProps} />, title: 'TV’s', link: '/test/test' },
        { svg: <IconDeviceLaptop {...svgProps} />, title: 'Laptops & Computers', link: '/test/test' },
        { svg: <IconDevices {...svgProps} />, title: 'Tablets & E-Readers', link: '/test/test' },
        { svg: <IconDeviceGamepad {...svgProps} />, title: 'Video Games, consoles & VR', link: '/test/test' },
        { svg: <IconHeadphones {...svgProps} />, title: 'Headphones, Earbuds & Speakers', link: '/test/test' },
        { svg: <IconDeviceMobile {...svgProps} />, title: 'Cell Phones', link: '/test/test' },
        { svg: <IconDeviceSpeaker {...svgProps} />, title: 'Home Theater, Audio & Video', link: '/test/test' },
        { svg: <IconHome {...svgProps} />, title: 'Smart Home, Security & Wi-Fi', link: '/test/test' },
        { svg: <IconHorseToy {...svgProps} />, title: 'Toys', link: '/test/test' },
        { svg: <IconDrone {...svgProps} />, title: 'Drones', link: '/test/test' },
        { svg: <IconCamera {...svgProps} />, title: 'Cameras & Camcorders', link: '/test/test' },
        { svg: <IconDeviceWatch {...svgProps} />, title: 'Activity Trackers & Smartwatches', link: '/test/test' },
        { svg: <IconFridge {...svgProps} />, title: 'Major Appliances', link: '/test/test' },
        { svg: <IconTeapot {...svgProps} />, title: 'Small Appliances', link: '/test/test' },
        { svg: <IconMovie {...svgProps} />, title: 'Movies, TV Shows & Music', link: '/test/test' },
        { svg: <IconPrinter {...svgProps} />, title: 'Printers, Ink & Home Office', link: '/test/test' },
        { svg: <IconCar {...svgProps} />, title: 'Car Electronics & GPS', link: '/test/test' },
        { svg: <IconDiscount {...svgProps} />, title: 'Clearance & More', link: '/test/test' },
    ]

    return (
        <div className='flex flex-col gap-3 h-100 w-full max-w-6xl sm:h-auto justify-center'>
            <h2 className=' font-bold text-lg sm:text-xl self-start'>Categories</h2>
            <div className='grid scrollbar overflow-y-auto grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-3  lg:( overflow-hidden gap-5 grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))]) '>
                {
                    categories.map(({ svg, title, link }, index) => {
                        return <CategoryBtn key={`categorie-${index}`} svg={svg} title={title} link={link} />
                    })
                }
            </div>

        </div>
    )
}

export { Categories }