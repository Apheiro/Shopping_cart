import { MutableRefObject, useState, useEffect } from "react"
import { useKeenSlider, KeenSliderPlugin, KeenSliderInstance } from "keen-slider/react"
import { useNavigation } from "react-router-dom"
import "keen-slider/keen-slider.min.css"

interface Props {
    imgs: string[]
}

function ThumbnailPlugin(mainRef: MutableRefObject<KeenSliderInstance | null>): KeenSliderPlugin {
    return (slider) => {
        function removeActive() {
            slider.slides.forEach((slide) => {
                slide.classList.remove("active")
            })
        }

        function addActive(idx: number) {
            slider.slides[idx].classList.add("active")
        }

        function addClickEvents() {
            slider.slides.forEach((slide, idx) => {
                slide.addEventListener("click", () => {
                    if (mainRef.current) mainRef.current.moveToIdx(idx)
                })
            })
        }

        slider.on("created", () => {
            if (!mainRef.current) return
            addActive(slider.track.details.rel)
            addClickEvents()
            mainRef.current.on("animationStarted", (main) => {
                removeActive()
                const next = main.animator.targetIdx || 0
                addActive(main.track.absToRel(next))
                slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
            })
        })
    }
}

export default function ImagesProduct({ imgs }: Props) {
    const [loaded, setLoaded] = useState<boolean>(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({ initial: 0, })
    const isLoading = useNavigation().state === "loading"
    const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            slides: {
                perView: 5,
                spacing: 20,
            },
        },
        [ThumbnailPlugin(instanceRef)]
    )

    useEffect(() => {
        setLoaded(false)
    }, [imgs])

    const imageStyle = `w-full ${!loaded && 'animate-pulse'} aspect-square bg-white rounded-lg text-neutral-200`
    const sliderStyle = ` w-full ${!loaded && 'animate-pulse'} bg-white rounded-lg text-neutral-200 p-2`
    const bgStyle = `h-full aspect-square flex justify-center items-center ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-800`

    return (
        <div className="w-full aspect-square flex flex-col gap-4 ">
            <div ref={sliderRef} className={`keen-slider ${imageStyle}`}>
                {
                    imgs.map((img, index) => (
                        <div className={`keen-slider__slide ${sliderStyle}`} key={`imgSlider${index + 1}`}>
                            <div className={bgStyle}> <img src={img} className="max-h-full max-w-full" /></div>
                        </div>
                    ))
                }

            </div>
            <div ref={thumbnailRef} className="keen-slider thumbnail ">
                {
                    imgs.map((img, index) => (
                        <div className={`keen-slider__slide ${sliderStyle}`} key={`imgSliderThmb${index + 1}`}>
                            <div className={bgStyle}> <img src={img} className="max-h-full max-w-full" onLoad={() => index + 1 === imgs.length && setLoaded(true)} /> </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}
