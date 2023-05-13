import { Form, useLocation, useNavigate } from "react-router-dom";
import { Radios, Input, Btn } from "./Core/Exports";
import { useState } from "react";

interface Props {
    defaultValue: { condition: string, min: string, max: string };
}

export default function FilterForm({ defaultValue }: Props) {
    const location = useLocation();
    const navigate = useNavigate()
    const [radioSelected, setRadioSelected] = useState<string>(defaultValue.condition);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const searchParams = new URLSearchParams(location.search);
        const formRef = e.target;
        const formData = new FormData(formRef as HTMLFormElement)
        const excludeParams: string[] = ['q', 'sr', 'pg']
        let deleteParams: string[] = []
        searchParams.forEach((value, key) => { if (!excludeParams.includes(key)) { deleteParams.push(key) } })
        deleteParams.forEach(key => searchParams.delete(key))
        formData.forEach((value, key) => { if (value) { searchParams.set(key, value.toString()) } })
        navigate(`/search?${searchParams.toString()}`)
    }

    return (
        <Form
            method="get"
            onSubmit={handleSubmit}
            className={`md:(row-start-1 row-end-3) bg-dbm h-fit gap-4 p-4 rounded-lg flex flex-col items-start `}
        >
            <h2 className="font-bold">Filters</h2>
            <div className="flex flex-col gap-2">
                <h3 className="font-semibold color-neutral-5">Condition</h3>
                <Radios
                    name="condition"
                    value="new"
                    Title='New'
                    radioSelected={radioSelected}
                    setRadioSelected={setRadioSelected}
                />
                <Radios
                    name="condition"
                    value="refurbished"
                    Title='Refurbished'
                    radioSelected={radioSelected}
                    setRadioSelected={setRadioSelected}
                />
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="font-semibold color-neutral-5">Price range</h3>
                <div className="flex justify-center items-center gap-3">
                    <Input variant="price" placeholder="min" name="min" defaultValue={defaultValue.min} />-<Input variant="price" placeholder="max" name="max" defaultValue={defaultValue.max} />
                </div>
            </div>
            <Btn variant="base" type="submit">Apply</Btn>
        </Form>
    )
}