'use client';
import Cookies from "js-cookie";
import { Apple, GitHub, Google } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  GithubAuthProvider
} from "firebase/auth";
import { set, ref, getDatabase,get} from "firebase/database";
import { auth, database } from "../firebase";
import { useRouter } from "next/navigation";

const db = getDatabase();

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const userRef = ref(database, `users/${user.uid}`);

      const snapshot = await get(userRef);


        
    if (!snapshot.exists()) {
      console.log("User account not found");
      alert("No User Account Found!");
      return;
    }

      // Store user data in Realtime Database
      

      console.log("Google login successful");
      router.push(`/user/${user.uid}`);
       Cookies.set('uid', user.uid, { secure: true, });
      Cookies.set('isLoggedIn', 'true', { secure: true, });
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };
const handleGithubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

     const userRef = ref(database, `users/${user.uid}`);

      const snapshot = await get(userRef);


        
    if (!snapshot.exists()) {
      console.log("User account not found");
      alert("No User Account Found!");
      return;
    }

      console.log("Github login successful");
      router.push(`/user/${user.uid}`);
       Cookies.set('uid', user.uid, { secure: true, });
      Cookies.set('isLoggedIn', 'true', { secure: true, });
    } catch (error) {
      console.error("Github login failed:", error);
    }
  };

  const signInWithEmailPassword = async () => {
  try {
    if (!email || !password) {
      setEmailError("Email and password are required");
      return;
    }
 const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    const userRef = ref(database, `users/${user.uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      console.log("User account not found");
      alert("No User Account Found!");
      return;
    }

   

    console.log("User signed in:", user);
    router.push(`/user/${user.uid}`);
  } catch (error) {
    console.error("Sign-in error:", error);
  }
};


  const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
    setEmailError(""); // Reset error when the user types
  };

  const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
    setPasswordError(""); // Reset error when the user types
  };

  
  return (
    
    <div className="h-screen w-full text-inherit">
      <div className="h-full w-full flex items-center justify-center">
        <div className="h-full w-full">
          <div
            className="flex flex-col hover:blur-0 h-full bg-center bg-cover items-center justify-center w-full gap-5 bg-inherit"
          >
            <ul className="inline-flex items-center text-xl gap-10">
              <li>
                <IconButton onClick={handleGoogleLogin}>
                  <Google />
                </IconButton>
              </li>
              <li>
                <IconButton onClick={handleGithubLogin}>
                  <GitHub />
                </IconButton>
              </li>
            </ul>
            <p className="text-inherit text-right">or use email your account</p>
            <input
              type="email"
              name=""
              id=""
              className="bg-white/50 hover:bg-white md:bg-white placeholder:text-violet-500 placeholder:text-sm text-violet-500 py-3 px-5 focus:text-violet-500 focus:outline focus:outline-offset-1 focus:outline-violet-500 rounded-md"
              placeholder="Enter Your Email Here!"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              type="password"
              name=""
              id=""
              className="w-200 bg-white/50 hover:bg-white md:bg-white placeholder:text-violet-500 placeholder:text-sm text-violet-500 py-3 px-5 focus:text-violet-500 focus:outline focus:outline-offset-1 focus:outline-violet-500 rounded-md"
              placeholder="Enter Your Password Here!"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="text-right">
              <a
                href=""
                className="italic text-inherit text-sm underline decoration-violet-500 text-violet-500 hover:text-violet-700 transition"
              >Forget your Password?
              </a>
            </div>
            <button
              onClick={signInWithEmailPassword} className="px-6 py-2 bg-violet-500 rounded hover:bg-white hover:text-violet-700 font-semibold transition-all text-white hover:scale-110"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function showErrorMessage(arg0: string) {
  throw new Error("Function not implemented.");
}

