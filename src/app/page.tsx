'use client'
import React, {  } from 'react';
import Header from './header';
import Arrivals from './arrivals';
import CloudLogo from './cloudlogo';
import Banner from './banners/banner';
import Carousel from './carousel';
import Stat from './stats';
import Footer  from './footer';
import Explore from './explore';


export default function Home() {
  return (
<>
    <div className='bg-white'>
      <div>
      <Header item={undefined} />
      <Explore></Explore>
      <Arrivals onAddToCart={(product) => {}}
  />
      <CloudLogo></CloudLogo>
      <Banner />
      <Carousel />
      <Stat></Stat>
          <Footer />
      </div>
    </div>
  </>
  )
}
