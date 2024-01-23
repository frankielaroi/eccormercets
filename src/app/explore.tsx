import React from 'react'
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import Image from 'next/image';
import Lady from '../../public/image 10.png';
import Lady1 from '../../public/image2.png'


export default function Explore() {
    return <div className='flex place-'>
    <img src='../../public/image 10.png' width={500} height={100} alt={''} className='flex right-0 left-10'/>
      <div className="text-center  place-content-center top-40 bottom-8 flex flex-col mt-8">
        <Typography variant="h4" className="italic font-serif">
          LIFE, ENJOYMENT AND OTHERS
        </Typography><div className='pt-40'>
        <Button className="mt-4 bg-[#00000065] text-white px-8 py-2 rounded-xl"><Link href='./categories'>
          EXPLORE MORE</Link>
        </Button></div>
      </div>
      <img src='../../public/image2.png'
 width={500} height={100} alt='' />
    </div>
}