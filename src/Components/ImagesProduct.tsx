import { MutableRefObject } from "react"
import { useKeenSlider, KeenSliderPlugin, KeenSliderInstance } from "keen-slider/react"
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
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({ initial: 0, })
    const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            slides: {
                perView: 5,
                spacing: 20,
                // origin: 'center'
            },
        },
        [ThumbnailPlugin(instanceRef)]
    )

    const imageStyle = 'keen-slider bg-db-1 rounded-lg text-neutral-200'
    const sliderStyle = 'keen-slider__slide aspect-square bg-db-1 rounded-lg text-neutral-200 p-2'
    const bgStyle = 'w-full aspect-square bg-no-repeat bg-center bg-contain'
    return (
        <div className="w-full flex flex-col gap-5">
            <div ref={sliderRef} className={imageStyle}>
                {
                    imgs.map((img) => (
                        <div className={sliderStyle}>
                            <div className={bgStyle} style={{ backgroundImage: `url(${img})` }}></div>
                        </div>
                    ))
                }

            </div>

            <div ref={thumbnailRef} className="keen-slider thumbnail">
                {
                    imgs.map((img) => (
                        <div className={sliderStyle}>
                            <div className={bgStyle} style={{ backgroundImage: `url(${img})` }}></div>
                        </div>
                    ))
                }

            </div>


        </div>
    )
}
