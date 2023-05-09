
import InfoCard from './Core/InfoCard'
import { useMediaQuery } from '@mantine/hooks';

export default function Features() {
    const wide = useMediaQuery('(min-width: 660px)');
    const features: { title: string, description: string }[] = [
        { title: 'Full control of your shopping cart', description: 'Add or remove products easily, without limitations.' },
        { title: 'Buy what you need, nothing more', description: 'Adjust the quantity of each product you want to buy and keep an accurate record of your purchase.' },
        { title: 'Keep your finances under control', description: 'You will always know how much you are spending with the total amount of your purchase visible at all times.' },
        { title: 'Attractive and functional design', description: 'A design that not only looks good, but is also easy to use and fits users\' needs.' },
        { title: 'Smooth and pleasant animations', description: 'Transitions and animations that make navigation more fluid and pleasant for the user.' },
        { title: 'Clear and easy to read information', description: 'A clear and orderly arrangement of information, without obtrusive advertising and with a font size and layout suitable for easy reading.' }
    ]
    return (
        <div className='flex flex-col gap-3 w-full max-w-4xl'>
            <h2 className=' font-bold text-lg 2sm:text-xl self-start'>Features</h2>
            <div className={`${wide ? 'grid-cols-2 grid-rows-3' : 'flex flex-col'} grid gap-5`}>
                {
                    features.map(({ title, description }, index) => {
                        return <InfoCard key={`Feature-${index}`} title={title} description={description} variant={wide ? 'static' : 'folding'} />
                    })
                }
            </div>

        </div>
    )
}