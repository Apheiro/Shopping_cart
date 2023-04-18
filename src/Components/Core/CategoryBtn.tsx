interface Props {
    svg: React.ReactNode,
    title: string,
    link?: string
}

export default function InputText({ svg, title, link }: Props) {
    return (
        <a href={link} className="flex items-center gap-1 justify-center flex-col bg-db-1 aspect-square w-36 rounded-lg text-neutral-300 text-sm p-3 text-center cursor-pointer hover:brightness-125 transition-[filter] duration-300">
            {svg}
            <p>{title}</p>
        </a>
    )
}