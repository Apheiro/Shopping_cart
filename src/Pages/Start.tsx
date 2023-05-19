import { Btn } from "../Components/Core/Exports"
import { motion } from "framer-motion";

const startAnimation = {
    initial: {
        opacity: 0,
        scale: 0.9,
        transition: { scale: { type: "spring", bounce: 0.5 }, opacity: { duration: 0.8 } }
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { scale: { type: "spring", bounce: 0.5 }, opacity: { duration: 0.8 } }
    }
}

export default function Start() {
    return (

        <motion.section
            className="flex justify-center items-center w-screen h-screen"
            initial={"initial"}
            animate={"animate"}
            variants={startAnimation}
        >
            <div className="flex items-center relative max-w-7xl w-full mx-10">
                <div className="flex flex-col gap-4 max-w-2xl z-1  bg-neutral-3/50 dark:(bg-db/50) backdrop-blur-md rounded-xl p-4">
                    <h1 className=" text-5xl sm:text-6xl text-transparent font-bold bg-clip-text bg-gradient-to-br from-purple-500 to-indigo-700">
                        STREAMLINE YOUR<br />
                        SHOPPING!
                    </h1>
                    <p className=" text-justify">
                        Simplify your online shopping with our easy-to-use cart. Browse products, add to your cart, and checkout with just a few clicks. Convenient shopping made simple.
                    </p>
                    <Btn classNameCustom="self-start" variant="shop">SHOP NOW</Btn>
                </div>
                <div className="flex op-0 md:(op-100) max-w-xl w-full aspect-square justify-center items-center absolute right-0 transition-opacity duration-300">
                    <img src="products.png" alt="image3Dproducts" />
                </div>
            </div>

        </motion.section>


    )
}