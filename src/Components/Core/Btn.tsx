import { Slot } from '@radix-ui/react-slot';

interface Props {
    asChild?: boolean,
    variant: 'shop' | 'base' | 'removeCart' | 'pay' | 'cart',
    children: React.ReactNode,
    classNameCustom?: any,
    id?: any,
    type?: string,
    onClick?: (React.MouseEventHandler<HTMLElement> & React.MouseEventHandler<HTMLButtonElement>) | undefined,
}

function Btn({ asChild, variant, classNameCustom, type = 'button', ...props }: Props) {
    const Component = asChild ? Slot : 'button';
    let className: string = 'box-border rounded-lg ease-in-out duration-300 transition-all font-semibold leading-3 ';
    switch (variant) {
        case 'shop':
            className += 'p-4 border-solid border-4 text-xl text-dv border-dv hover:bg-dv hover:bg-opacity-20';
            break;
        case 'base':
            className += 'p-3 bg-dv bg-opacity-30 text-base text-violet-400 hover:bg-opacity-50';
            break;
        case 'removeCart':
            className += 'p-3 bg-red-500 bg-opacity-30 text-base text-red-500 hover:bg-opacity-50';
            break;
        case 'pay':
            className += 'p-3 bg-lime-500 bg-opacity-30 text-base text-lime-500 hover:bg-opacity-50';
            break;
        case 'cart':
            className += 'p-2 flex items-center gap-2 bg-transparent text-base text-neutral-100 opacity-40 hover:bg-white hover:bg-opacity-[0.03] hover:opacity-100';
            break;
        default:
    }

    return <Component className={`${className} ${classNameCustom} `} {...props} />;
}

export default Btn