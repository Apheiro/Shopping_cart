import { Btn } from './Core/Exports'
import { IconBrandTwitterFilled, IconBrandFacebookFilled, IconBrandInstagram } from '@tabler/icons-react'
import { memo } from 'react';

const Footer = memo(() => {
    return (
        <footer className=" bg-neutral-1 dark:(bg-dbm) w-full flex justify-center items-center p-4 ">
            <div className='md:grid md:max-w-7xl gap-7 flex flex-col'>
                <div className="row-start-1 row-end-3 flex flex-col gap-3">
                    <h3 className="text-lg font-bold ">About us</h3>
                    <p className='text-sm'>
                        In our online store, we have set out to provide you with an exceptional shopping experience. To do so, we have created an attractive and carefully designed environment, where you can find everything you need to make your online purchases easily, quickly and without unnecessary distractions.<br />
                        With our shopping cart, you can add and remove products with a single click, control the quantity of each product you want to buy, and see the total amount of your purchase in real time. In addition, we have designed our site with you in mind, with smooth animations that allow you to navigate without interruptions, and a clear layout of information that makes everything easy to find and read.<br />
                        Thank you for visiting us and we hope you enjoy shopping at our online store!
                    </p>
                </div>

                <div className="row-start-0 row-end-2 flex flex-col gap-3">
                    <h3 className=" text-lg font-bold ">Contact us</h3>
                    <p className='text-sm'>
                        Email: info@myonlineshop.com <br />
                        Phone: +1 (555) 555-5555<br />
                        Address: 123 Main St, Anytown, USA
                    </p>
                </div>

                <div className="col-start-2 flex flex-col gap-3 text-sm">
                    Copyright information:<br />
                    Copyright © 2023 My Online Shop. All rights reserved.
                </div>

                <div className=" row-start-0 row-end-2 flex flex-col gap-3">
                    <h3 className=" text-lg font-bold ">Social media</h3>
                    <div className='flex gap-3'>
                        <Btn variant='cart' ><IconBrandTwitterFilled /></Btn>
                        <Btn variant='cart' ><IconBrandFacebookFilled /></Btn>
                        <Btn variant='cart' ><IconBrandInstagram /></Btn>
                    </div>
                </div>
            </div>
        </footer>
    );
})


export { Footer };