'use client'
import React, { useEffect, useState } from 'react';
import Header from '../../header'
import Footer from '../../footer'
import { useParams } from 'next/navigation';
import { database } from '../../firebase';
import { get, ref } from 'firebase/database';
import { Avatar, Button, Typography } from '@mui/material';
interface User {
    uid: string;
    email: string,
    providerId: string,
    displayName: string,
    photoURL: string,
    createdAt: number,
    lastLogin: number
}
export default function Account() {
    const { uid } = useParams();
    const [user, setUser] = useState<User | null>(null);
    

    useEffect(() => {
        const getItem = async () => {
            if (uid) {
                const itemRef = ref(database, `users/${uid}`);
                try {
                    const snapshot = await get(itemRef);
                    if (snapshot.exists()) {
                        setUser({ ...snapshot.val(), uid: snapshot.key } as User);
                    } else {
                        console.log('Item not found');
                    }
                } catch (error) {
                    console.log('Error getting item:', error);
                }
            }
        }; 
        getItem()
    }, [uid]);
    return (
        <div className='flex place-content-evenly flex-col'>
            <Header item={undefined} /> 
            <div className='flex place-content-center'>
           <div className='flex flex-col'> <Avatar src={user?.photoURL} sx={{
                display: 'flex',
                placeContent: 'center',
                justifyContent: 'center',
                width: 200,
                height:200,
            }} />
                <div>
                        <Typography sx={{
                            fontStyle: 'italic',
                            fontFamily:'monospace'
                        }} variant='h3'>{user?.displayName}</Typography>
                        <Button sx={{
                            fontStyle: 'italic',
                            fontFamily:'monospace'
                    }} variant='outlined'>{user?.email}</Button>
                </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}