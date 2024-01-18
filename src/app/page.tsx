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
import { motion } from 'framer-motion';


export default function Home() {
  return (
     <>
      <div className='bg-white'>
        <div>
          <Header item={undefined} />
          
          {/* Apply motion.div for fade-in animation */}
            <Explore></Explore>

          {/* Apply motion.div for fade-in animation */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Arrivals onAddToCart={(product) => {}} />
          </motion.div>

          <CloudLogo></CloudLogo>
          <Banner />

          {/* Apply motion.div for fade-in animation */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Carousel />
          </motion.div>

          {/* Apply motion.div for fade-in animation */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Stat></Stat>
          </motion.div>

          <Footer />
        </div>
      </div>
    </>
  )
}
