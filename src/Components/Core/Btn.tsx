import { Slot } from '@radix-ui/react-slot';
import { motion } from 'framer-motion';

interface Props {
    asChild?: boolean,
    variant: 'shop' | 'base' | 'removeCart' | 'pay' | 'cart',
    children: React.ReactNode,
    classNameCustom?: any,
    id?: any,
    type?: 'submit' | 'button' | 'reset' | undefined,
    onClick?: (React.MouseEventHandler<HTMLElement> & React.MouseEventHandler<HTMLButtonElement>) | undefined,
    disabled?: boolean
}

function Btn({ asChild, variant, classNameCustom, type = 'button', ...props }: Props) {
    const Component = asChild ? Slot : 'button';
    let className: string = 'flex justify-center items-center box-border rounded-lg font-semibold leading-3 transition-background-color duration-500  ';
    switch (variant) {
        case 'shop':
            className += 'p-3 bg-transparent border-solid border-4 text-xl text-dv border-dv hover:(bg-dv/20)';
            break;
        case 'base':
            className += 'p-3  text-base bg-violet-4/30 text-dv hover:bg-violet-4/50 dark:(bg-dv/30 text-violet-4 hover:bg-dv/50)';
            break;
        case 'removeCart':
            className += 'p-3  text-base bg-red-4/30 text-red-5 hover:bg-red-4/50 dark:(bg-red-5/30 text-red-5 hover:bg-red-5/50)';
            break;
        case 'pay':
            className += 'p-3  text-base bg-lime-4/30 text-lime-6 hover:bg-lime-4/50 dark:(bg-lime-5/30 text-lime-5 hover:bg-lime-5/50)';
            break;
        case 'cart':
            className += 'p-2 flex items-center gap-2 text-base bg-transparent text-black/40 hover:(text-black/80 bg-black/10) dark:(text-neutral-100/40 hover:text-neutral-100/80 hover:bg-white/4)';
            break;
        default:
    }

    return (
        <motion.label
            className='w-fit h-fit'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            transition={{ scale: { duration: 0.5, type: 'spring' } }}
        >
            <Component
                className={`${className} ${classNameCustom} `}
                type={asChild ? undefined : type}
                {...props}
            />
        </motion.label>

    )
}

export { Btn }