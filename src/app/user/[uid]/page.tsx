'use client'
import React, { useEffect, useState } from 'react';
import Header from '../../header'
import Footer from '../../footer'
import { useParams } from 'next/navigation';
import { database } from '../../firebase';
import { get, ref } from 'firebase/database';
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
  const [user,setUser] = useState<User | null>(null);

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
        }
    });
    return (
        <div className='bg-[#00000065]'>
            <Header item={undefined} />
            {uid}
            {}
            <Footer />
        </div>
    )
}