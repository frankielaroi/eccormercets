'use client'
import { Apple, GitHub, Google } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, getAuth, GithubAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import { useRouter } from "next/navigation";

export default function Login() {
   const router = useRouter(); // Initialize the useRouter hook
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      if (typeof window !== 'undefined') {
        // Ensure that the code inside this block runs only on the client side
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        console.log("Google login successful");
      }
      // Additional logic 
      // Additional logic or redirect if needed
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

   useEffect(() => {
    // Ensure that this code runs only on the client side
    if (typeof window !== 'undefined' && window.location) {
      // Additional logic or redirect if needed
      router.push('../');
    }
  }, []);

  const handleGitHubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("GitHub login successful");
      // Additional logic or redirect if needed
    } catch (error) {
      console.error("GitHub login failed:", error);
    }
  };

  const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
    setEmailError(""); // Reset error when user types
  };

  const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
    setPasswordError(""); // Reset error when user types
  };

  const signInWithEmailPassword = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // Handle successful sign-in
      const user = result.user;
      if (!email) {
        setEmailError("Email is required");
        return;
      }

      if (!password) {
        setPasswordError("Password is required");
        return;
      }
      console.log("User signed in:", user);
      // Redirect or perform additional actions as needed
    } catch (error) {
      // Handle errors
      console.error("Sign-in error:");
    }
  };

  return (
    <div className="flex flex-col place-content-center py-40">
      <div className="flex flex-col place-items-center p-10">
        <div className="flex justify-center">
          <Button startIcon={<Google />} onClick={handleGoogleLogin} />
          <Button startIcon={<GitHub />} onClick={handleGitHubLogin} />
          <Button startIcon={<Apple />} />
        </div>

        <div className="flex flex-col place-items-center p-10">
          <TextField
            label="Email"
            fullWidth={true}
            sx={{
              maxWidth: 700,
              margin: "auto",
            }}
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
          />
        </div>

        <div className="flex flex-col place-items-center">
          <TextField
            label="Password"
            fullWidth={true}
            sx={{
              maxWidth: 500,
              margin: " auto",
            }}
            type="password"
            value={password}
            onChange={handlePasswordChange}
            error={!!passwordError}
            helperText={passwordError}
          />
        </div>

        <div className="flex flex-col place-items-center">
          <Button
            onClick={signInWithEmailPassword}
            variant="contained"
            color="primary"
            size="large"
            sx={{
              marginTop: 3,
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
