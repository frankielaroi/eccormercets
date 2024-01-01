// components/SideDrawer.ts
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import Link from 'next/link';

const SideDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [uid, setUid] = useState<string | null>(null);
  const [userActive, setUserActive] = useState<boolean>(false);
  const [accountLink, setAccountLink] = useState<string>('/auth'); // Initialize with the default value

  useEffect(() => {
    // Retrieve uid and isLoggedIn from cookies
    const storedUid = Cookies.get('uid');
    const storedIsLoggedIn = Cookies.get('isLoggedIn');

    // Update state with retrieved values
    setUid(storedUid ?? null);
    setUserActive(storedIsLoggedIn === 'true');

    // Update accountLink based on userActive state
    if (userActive) {
      setAccountLink(`/user/${uid}`);
    } else {
      setAccountLink('/auth');
    }
  }, [userActive, uid]);

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <div className="pt-6 flex flex-col">
        {['Account', 'Categories', 'Track An Order', 'Settings', 'Contact Us'].map((text) => (
          <Typography
            key={text}
            variant="subtitle1"
            className="p-5 font-serif transition duration-150 ease-out hover:ease-in bg-[#B6BBC4] hover:bg-[#161A30]"
          >
            {text === 'Categories' ? (
              <Link href="./categories">{text}</Link>
            ) : (
              <Link href={accountLink}>{text}</Link>
            )}
          </Typography>
        ))}
      </div>
    </Drawer>
  );
};

export default SideDrawer;
