'use client';
import { Apple, Google } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { set, ref, getDatabase } from "firebase/database";
import { auth } from "../firebase";
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

      // Store user data in Realtime Database
      await set(ref(db, `users/${user.uid}`), {
        email: user.email,
        // Add other user data as needed
      });

      console.log("Google login successful");
      router.push(`/user/${user.uid}`);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const signInWithEmailPassword = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      if (!email) {
        setEmailError("Email is required");
        return;
      }

      if (!password) {
        setPasswordError("Password is required");
        return;
      }

      // Store user data in Realtime Database
      await set(ref(db, `users/${user.uid}`), {
        email: user.email,
        // Add other user data as needed
      });

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

  useEffect(() => {
    if (typeof window !== "undefined" && window.location) {
      router.push("../");
    }
  }, []);

  return (
    <div className="flex flex-col place-content-center py-40">
      <div className="flex flex-col place-items-center p-10">
        <div className="flex justify-center">
          <Button startIcon={<Google />} onClick={handleGoogleLogin} />
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
