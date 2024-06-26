// components/SideDrawer.ts
import Cookies from "js-cookie";
import gsap from "gsap";
import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import Link from "next/link";
import { RootState, AppDispatch} from "./redux/store";
import { login, logout } from "./redux/slices/authSlice";

const SideDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [uid, setUid] = useState<string | null>(null);
  const [userActive, setUserActive] = useState<boolean>(false);
  const [accountLink, setAccountLink] = useState<string>("/auth"); // Initialize with the default value

  const dispatch = useDispatch<AppDispatch>();
  const isloggedIn = useSelector(
    (state: RootState) => state.auth.isloggedIn
  );
  const id = useSelector((state: RootState) => state.auth.id);
  useEffect(() => {

    // Update accountLink based on userActive state
    if (isloggedIn) {
      setAccountLink(`/user/${id}`);
    } else {
      setAccountLink("/auth");
    }
  }, [id, isloggedIn]);

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <div className="pt-6 flex flex-col bg-white">
        {[
          { text: "Account", url: accountLink },
          { text: "Categories", url: "../categories" },
          { text: "Track An Order", url: "/track-order" }, // Example URL, replace with actual URLs
          { text: "Settings", url: "/settings" },
          { text: "Contact Us", url: "/contact" },
        ].map(({ text, url }, index) => (
          <Typography
            key={text}
            variant="subtitle1"
            className="p-5 font-serif transition duration-150 ease-out hover:ease-in bg-[#B6BBC4] hover:bg-[#161A30] link opacity-1"
            style={{
              animationDelay: isOpen ? `${index * 0.1}s` : "0s",
              animationDuration: "0.3s",
            }}
          >
            <Link href={url} prefetch>
              {text}
            </Link>
          </Typography>
        ))}
      </div>
    </Drawer>
  );
};

export default SideDrawer;
