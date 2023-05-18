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
    const Component = asChild ? motion(Slot) : motion('button');
    let className: string = 'flex justify-center items-center box-border rounded-lg font-semibold leading-3 transition-background-color duration-500  ';
    switch (variant) {
        case 'shop':
            className += 'p-4 bg-transparent border-solid border-4 text-xl text-dv border-dv hover:(bg-dv/20)';
            break;
        case 'base':
            className += 'p-3 bg-dv/30 text-base text-violet-4 hover:bg-dv/50';
            break;
        case 'removeCart':
            className += 'p-3 bg-red-5/30 text-base text-red-5 hover:bg-red-500/50';
            break;
        case 'pay':
            className += 'p-3 bg-lime-5/30 text-base text-lime-5 hover:bg-lime-500/50';
            break;
        case 'cart':
            className += 'p-2 flex items-center gap-2 bg-transparent text-base text-neutral-100 opacity-40 hover:(bg-white bg-opacity-[0.03] opacity-100)';
            break;
        default:
    }

    return (
        <Component
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            transition={{ scale: { duration: 0.5, type: 'spring' } }}
            className={`${className} ${classNameCustom} `}
            type={asChild ? undefined : type}
            {...props}
        />
    )
}

export { Btn }