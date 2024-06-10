import React from 'react'
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import Image from 'next/image';

export default function Explore() {
    return <div className="flex flex-col bg-[url('https://img.freepik.com/free-photo/full-shot-woman-posing-with-orange-outfit_23-2150728993.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1717027200&semt=ais_user')] ">
      <div className="text-center  place-content-center top-40 bottom-8 flex flex-col mt-8 ">
        <Typography variant="h4" className="italic font-serif">
          LIFE, ENJOYMENT AND OTHERS
        </Typography><div className='pt-40'>
        <Button className="mt-4 bg-[#00000065] text-white px-8 py-2 rounded-xl"><Link href='./categories'>
          EXPLORE MORE</Link>
        </Button></div>
      </div>
    </div>
}