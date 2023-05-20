import { Details, Features, Images } from "./productsRequests"
import { decode } from "html-entities"
export function details(detailsObj: Details[]): JSX.Element {
    return (
        <>
            {
                detailsObj.map((detail, index) => <p key={`detail-${index}`} ><span className="font-semibold">{decode(detail.name)}:</span> {decode(detail.value)}</p>)
            }
        </>
    )
}

export function features(featuresObj: Features[]): JSX.Element {
    if (featuresObj.length === 0) { return <>This product doesn't provide any features</> }
    return (
        <>
            {featuresObj.map((feature, index) => <p key={`feature-${index}`} >{decode(feature.feature)}</p>)}
        </>
    )
}

export function images(imgObj: Images[], img: string): string[] {
    const images: string[] = imgObj.filter(img => img.rel.includes("Zoom")).map(img => img.href)
    if (images.length === 0) { return [img] }
    return images
}

export function description(desc: string, longDesc: string, plot: string): string {
    if (longDesc !== null) { return decode(longDesc) }
    else if (desc !== null) { return decode(desc) }
    else if (plot !== null) { return decode(plot) }
    else { return "This product doesn't provide any description" }
}