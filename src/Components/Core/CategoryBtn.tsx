interface Props {
    svg: React.ReactNode,
    title: string,
    link?: string,
}

export default function InputText({ svg, title, link }: Props) {
    return (
        <a href={link} className='flex gap-3 items-center bg-db-1 rounded-lg text-sm p-3 cursor-pointer hover:brightness-125 transition-[filter] duration-30 2md:flex-col 2md:h-full 2md:aspect-square 2md:gap-1 2md:justify-center 2md:text-center '>
            {svg}
            <p>{title}</p>
        </a>
    )
}