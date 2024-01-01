'use client'
import React, {  } from 'react';
import Header from './header';
import Lady from '../../public/image 10.png';
import Image from 'next/image';
import { Button, Typography } from '@mui/material';
import Arrivals from './arrivals';
import CloudLogo from './cloudlogo';
import Banner from './banners/banner';
import Carousel from './carousel';
import Stat from './stats';
import Footer  from './footer';
import Link from 'next/link';
import { UserStatusProvider } from './userStatus';


export default function Home() {
  return (
<UserStatusProvider>
    <div>
      <div>
      <Header item={undefined} />
      <Image src={Lady} width={1000} alt={''} />
      <div className="text-center absolute top-40 flex flex-col mt-8">
        <Typography variant="h4" className="italic font-serif">
          LIFE, ENJOYMENT AND OTHERS
        </Typography><div className='pt-40'>
        <Button className="mt-4 bg-[#00000065] text-white px-8 py-2 rounded-xl"><Link href='./categories'>
          EXPLORE MORE</Link>
        </Button></div>
      </div>
      <Arrivals onAddToCart={(product) => {}}
  />
      <CloudLogo></CloudLogo>
      <Banner />
      <Carousel />
      <Stat></Stat>
          <Footer />
      </div>
    </div>
  </UserStatusProvider>
  )
}
