import { Slot } from '@radix-ui/react-slot';

interface Props {
    asChild?: boolean
    variant: 'shop' | 'base' | 'removeCart' | 'pay' | 'cart'
    children: React.ReactNode,
    onClick?: (React.MouseEventHandler<HTMLElement> & React.MouseEventHandler<HTMLButtonElement>) | undefined,
}

function Btn({ asChild, variant, ...props }: Props) {
    const Component = asChild ? Slot : 'button';
    let className: string = 'box-border rounded-lg ease-in-out duration-300 transition-all ';
    switch (variant) {
        case 'shop':
            className += 'border-solid border-4  w-36 h-12 text-xl font-bold text-dv border-dv hover:bg-dv hover:bg-opacity-20';
            break;
        case 'base':
            className += 'w-28 h-10 bg-dv bg-opacity-30 text-base font-bold text-violet-400 hover:bg-opacity-50';
            break;
        case 'removeCart':
            className += 'w-32 h-10 bg-red-500 bg-opacity-30 text-base font-bold text-red-500 hover:bg-opacity-50';
            break;
        case 'pay':
            className += 'w-32 h-10 bg-lime-500 bg-opacity-30 text-base font-bold text-lime-500 hover:bg-opacity-50';
            break;
        case 'cart':
            className += 'p-2 bg-transparent bg-opacity-30 text-base font-semibold text-neutral-300 text-opacity-70 hover:bg-db-2 hover:text-opacity-100';
            break;
        default:
    }

    return <Component className={className} {...props} />;
}

export default Btn