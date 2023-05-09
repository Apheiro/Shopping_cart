import Layout from "./Layout"
import { ImagesProduct } from "../Components/Exports"
import { InfoCard, Btn } from "../Components/Core/Exports"

const imgs = [
    'https://imgs.search.brave.com/MA6qGmdewqSF9MqnZ9cm81Fr7WdQh4CdORuWWawRtSI/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9icml0/YS5teC93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMC8wNC9DdXJz/b3MtZ3JhdGlzLWRl/LUludGVsaWdlbmNp/YS1BcnRpZmljaWFs/LmpwZWc',
    'https://imgs.search.brave.com/DaXdWq9JEHFQb7AA0qdf_KES-lt26liZeU98enoPEHE/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/ZGF0YXJhaW4uY29t/LmJyL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIwLzAyL2lhci5q/cGc',
    'https://imgs.search.brave.com/gFKv0aFqx4NtyFOIlwIWoLYp-0JZmmEwDES-hkQeYKk/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9jb25m/aWxlZ2FsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxOC8w/Mi9JTlRFTElFTkNJ/QS1BUlRJRklDSUFM/LS5qcGVn',
    'https://imgs.search.brave.com/CVLPDzqaWEnSso1hRxmrZcpDuoJlVBxQQ1FaoUwWIg0/rs:fit:1200:1130:1/g:ce/aHR0cHM6Ly93d3cu/Y3JpdGljYS5jb20u/cGEvc2l0ZXMvZGVm/YXVsdC9maWxlcy9p/bWFnZW5lcy8yMDE5/LzAzLzE5L2ludGVs/aWdlbmNpYS5qcGVn',
    'https://imgs.search.brave.com/C5lg44SCy9btdXEwjINma7DJKPD0l6_q96oollJVSKI/rs:fit:1200:788:1/g:ce/aHR0cHM6Ly9wZXJp/b2Rpc21vLnVuaXph/ci5lcy93cC1jb250/ZW50L3VwbG9hZHMv/aW50ZWxpZ2VuY2lh/LWFydGlmaWNpYWwt/ZW50cmVtZWRpb3Mt/MjAyMC5qcGc',
    'https://imgs.search.brave.com/MA6qGmdewqSF9MqnZ9cm81Fr7WdQh4CdORuWWawRtSI/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9icml0/YS5teC93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMC8wNC9DdXJz/b3MtZ3JhdGlzLWRl/LUludGVsaWdlbmNp/YS1BcnRpZmljaWFs/LmpwZWc',
    'https://imgs.search.brave.com/DaXdWq9JEHFQb7AA0qdf_KES-lt26liZeU98enoPEHE/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/ZGF0YXJhaW4uY29t/LmJyL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIwLzAyL2lhci5q/cGc',
    'https://imgs.search.brave.com/gFKv0aFqx4NtyFOIlwIWoLYp-0JZmmEwDES-hkQeYKk/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9jb25m/aWxlZ2FsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxOC8w/Mi9JTlRFTElFTkNJ/QS1BUlRJRklDSUFM/LS5qcGVn',
]

function textDescription(): JSX.Element {
    return (
        <p>
            Product Name: Class of 81' Deluxe Arcade Game <br />
            Brand: Arcade1Up <br />
            Compatible Platform(s): Other Console Type: Arcade <br />
            Arcade Design: Full-size <br />
            Model Number: MSP-A-303611 <br />
            Color Category: Blue <br />
            Screen Size: 17 inches <br />
            Maximum Graphic Quality: 1080p <br />
            Storage Type: Flash <br />
            Product Height: 61 inches <br />
            Product Width: 22.5 inches <br />
            Product Length: 18.75 inches <br />
            Product Weight: 71 pounds <br />
            Wireless Connectivity: Wi-Fi <br />
            Smart Capable: Yes <br />
            Number Of USB Port(s): 0 <br />
            Maximum Number Of Players: 2 <br />
            Games Included: Yes <br />
            ESRB Rating E: (Everyone) <br />
            Power Source: Plug-in <br />
            AC Adapter Included: Yes <br />
            Number Of Games Included: 12 <br />
            Game Title(s) Included: Ms. PAC-MAN, GALAGA, GALAGA'88, GALAXIAN, DIG DUG, DIG DUG II, MAPPY, RALLY-X, ROLLING THUNDER, ROMPERS, THE TOWER OF DRUAGA, KING & BALLOON <br />
            Cable(s) Included: AC power <br />
            Manufacturer's Warranty - Parts 90 Days <br />
            Manufacturer's Warranty - Labor 90 days <br />
            UPC: 195570019726 <br />
        </p>
    )
}

export default function Product() {
    return (
        <Layout>
            <section className="min-h-screen w-full p-4 py-21">
                <div className=" flex flex-col gap-4 md:( grid grid-cols-2 grid-rows-[1fr_auto]  max-w-5xl mx-auto )  ">
                    <ImagesProduct imgs={imgs} />
                    <div className="flex flex-col gap-4 text-neutral-3">
                        <div className="flex flex-col gap-4 bg-dbm p-3 rounded-lg">
                            <p className="font-semibold text-neutral-5">New</p>
                            <h1 className="font-bold text-xl">Flash Furniture - Hercules Series 661 lb. Capacity Navy Ergonomic Stack Chair w/ Black Frame-16" Seat Height - TRUE Navy Plastic/Black Frame</h1>
                            <div className="flex justify-between">
                                <p><span className="text-neutral-5 font-bold">Model:</span> MLML3LL/A</p>
                                <p><span className="text-neutral-5 font-bold">SKU:</span> 6443282</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-neutral-5 font-bold">Price</p>
                                    <h2 className="text-xl">$13.499</h2>
                                </div>
                                <Btn variant="base">Add to cart</Btn>
                            </div>
                        </div>
                        <InfoCard variant="static" title="Description" description={`Run a smooth after school program by having plenty of these heavy-duty plastic stack chairs around rambunctious kids who tend to be tough on seating. These classroom chairs are comfortable with an air-vented back and waterfall seat edge to put students at ease while learning. The 16" seat height is ideal for 3rd - 7th Grade students.These school stack chairs are built to last with a dual braced frame that can hold up to 661 pounds. School maintenance workers can appreciate student chairs that can stack for floor upkeep, these student desk chairs stack up to 15 chairs high. We consider this student stack chair to be the premier stack chair - essential for every school and classroom setting.`} />
                    </div>
                    <InfoCard variant="folding" title="Features" description="test" />
                    <InfoCard variant="folding" title="Details" description={textDescription()} />
                </div>
            </section>
        </Layout>
    )
}