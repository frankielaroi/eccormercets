'use client';
import Cookies from "js-cookie";
import { Apple, GitHub } from "@mui/icons-material";
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
    
    <div className="h-screen w-full text-inherit bg-white">
      <div className="h-full w-full flex items-center justify-center">
        <div className="h-full w-full">
          <div
            className="flex flex-col hover:blur-0 h-full bg-center bg-cover items-center justify-center w-full gap-5 bg-inherit"
          >
            <ul className="inline-flex items-center text-xl gap-10">
              <li>
                <a onClick={handleGoogleLogin} className="inline-block w-full px-6 py-3 mb-4 font-bold text-center uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>
                </a> 
              </li>
              <li>
                <a onClick={handleGithubLogin} className="inline-block w-full px-6 py-3 mb-4 font-bold text-center uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
<path fill="#fff" d="M41,24c0,9.4-7.6,17-17,17S7,33.4,7,24S14.6,7,24,7S41,14.6,41,24z"></path><path fill="#455a64" d="M21 41v-5.5c0-.3.2-.5.5-.5s.5.2.5.5V41h2v-6.5c0-.3.2-.5.5-.5s.5.2.5.5V41h2v-5.5c0-.3.2-.5.5-.5s.5.2.5.5V41h1.8c.2-.3.2-.6.2-1.1V36c0-2.2-1.9-5.2-4.3-5.2h-2.5c-2.3 0-4.3 3.1-4.3 5.2v3.9c0 .4.1.8.2 1.1L21 41 21 41zM40.1 26.4C40.1 26.4 40.1 26.4 40.1 26.4c0 0-1.3-.4-2.4-.4 0 0-.1 0-.1 0-1.1 0-2.9.3-2.9.3-.1 0-.1 0-.1-.1 0-.1 0-.1.1-.1.1 0 2-.3 3.1-.3 1.1 0 2.4.4 2.5.4.1 0 .1.1.1.2C40.2 26.3 40.2 26.4 40.1 26.4zM39.8 27.2C39.8 27.2 39.8 27.2 39.8 27.2c0 0-1.4-.4-2.6-.4-.9 0-3 .2-3.1.2-.1 0-.1 0-.1-.1 0-.1 0-.1.1-.1.1 0 2.2-.2 3.1-.2 1.3 0 2.6.4 2.6.4.1 0 .1.1.1.2C39.9 27.1 39.9 27.2 39.8 27.2zM7.8 26.4c-.1 0-.1 0-.1-.1 0-.1 0-.1.1-.2.8-.2 2.4-.5 3.3-.5.8 0 3.5.2 3.6.2.1 0 .1.1.1.1 0 .1-.1.1-.1.1 0 0-2.7-.2-3.5-.2C10.1 26 8.6 26.2 7.8 26.4 7.8 26.4 7.8 26.4 7.8 26.4zM8.2 27.9c0 0-.1 0-.1-.1 0-.1 0-.1 0-.2.1 0 1.4-.8 2.9-1 1.3-.2 4 .1 4.2.1.1 0 .1.1.1.1 0 .1-.1.1-.1.1 0 0 0 0 0 0 0 0-2.8-.3-4.1-.1C9.6 27.1 8.2 27.9 8.2 27.9 8.2 27.9 8.2 27.9 8.2 27.9z"></path><path fill="#455a64" d="M14.2,23.5c0-4.4,4.6-8.5,10.3-8.5c5.7,0,10.3,4,10.3,8.5S31.5,31,24.5,31S14.2,27.9,14.2,23.5z"></path><path fill="#455a64" d="M28.6 16.3c0 0 1.7-2.3 4.8-2.3 1.2 1.2.4 4.8 0 5.8L28.6 16.3zM20.4 16.3c0 0-1.7-2.3-4.8-2.3-1.2 1.2-.4 4.8 0 5.8L20.4 16.3zM20.1 35.9c0 0-2.3 0-2.8 0-1.2 0-2.3-.5-2.8-1.5-.6-1.1-1.1-2.3-2.6-3.3-.3-.2-.1-.4.4-.4.5.1 1.4.2 2.1 1.1.7.9 1.5 2 2.8 2 1.3 0 2.7 0 3.5-.9L20.1 35.9z"></path><path fill="#00bcd4" d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z M24,40c-8.8,0-16-7.2-16-16S15.2,8,24,8 s16,7.2,16,16S32.8,40,24,40z"></path>
</svg>
                </a>
              </li>
            </ul>
            <p className="text-inherit text-right">or use email your account</p>
            <input
              type="email"
              name=""
              id=""
              className="bg-white/50 hover:bg-black md:bg-black placeholder:text-violet-500 placeholder:text-sm text-violet-500 py-3 px-5 focus:text-violet-500 focus:outline focus:outline-offset-1 focus:outline-violet-500 rounded-md"
              placeholder="Enter Your Email Here!"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              type="password"
              name=""
              id=""
              className="w-200 bg-white/50 hover:bg-black md:bg-white placeholder:text-violet-500 placeholder:text-sm text-violet-500 py-3 px-5 focus:text-violet-500 focus:outline focus:outline-offset-1 focus:outline-violet-500 rounded-md"
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
              onClick={signInWithEmailPassword} className="px-6 py-2 bg-violet-500 rounded hover:bg-black hover:text-violet-700 font-semibold transition-all text-white hover:scale-110"
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

