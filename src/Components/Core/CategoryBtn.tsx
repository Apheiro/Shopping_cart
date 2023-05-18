interface Props {
    svg: React.ReactNode,
    title: string,
    link?: string,
}
function CategoryBtn({ svg, title, link }: Props) {
    return (
        <a href={link} className='flex gap-3 items-center bg-dbm rounded-lg text-sm p-3 cursor-pointer transition-filter transition-duration-300 hover:(brightness-125) duration-30 lg:( flex-col h-full aspect-square gap-1 justify-center text-center )'>
            {svg}
            <p>{title}</p>
        </a>
    )
}

export { CategoryBtn }