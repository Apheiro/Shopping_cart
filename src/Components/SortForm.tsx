import { useLocation, useNavigate } from "react-router-dom";

interface Props {
    defaultValue: string
}

export default function SortForm({ ...props }: Props) {
    const location = useLocation();
    const navigate = useNavigate();

    function handleSubmit(e: React.ChangeEvent<HTMLSelectElement>) {
        const searchParams = new URLSearchParams(location.search);
        const sortValue = e.currentTarget.value;
        searchParams.set('sr', sortValue);
        navigate(`/search?${searchParams.toString()}`)
    }

    return (
        <div className="flex items-center gap-2">
            <p>
                Sort by:
            </p>
            <select onChange={handleSubmit} className="bg-db rounded-lg p-1 h-9 border-none" {...props}>
                <option value="bm">Best match</option>
                <option value="salePrice.asc">Price: Low to High</option>
                <option value="salePrice.dsc">Price: High to Low</option>
                <option value="name.asc">Name: A-Z</option>
                <option value="name.dsc">Name: Z-A</option>
            </select>
        </div>
    )
}

export { SortForm }