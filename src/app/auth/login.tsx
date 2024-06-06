// components/Login.tsx

'use client';

import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, GithubAuthProvider } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, database } from '../firebase';
import { useRouter } from 'next/navigation';
import { login } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        console.log('User account not found');
        alert('No User Account Found!');
        return;
      }

      dispatch(login({ id: user.uid, name: user.displayName || 'User' }));
      console.log('Google login successful');
      router.push(`/user/${user.uid}`);
      Cookies.set('uid', user.uid, { secure: true });
      Cookies.set('isLoggedIn', 'true', { secure: true });
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        console.log('User account not found');
        alert('No User Account Found!');
        return;
      }

      dispatch(login({ id: user.uid, name: user.displayName || 'User' }));
      console.log('Github login successful');
      router.push(`/user/${user.uid}`);
      Cookies.set('uid', user.uid, { secure: true });
      Cookies.set('isLoggedIn', 'true', { secure: true });
    } catch (error) {
      console.error('Github login failed:', error);
    }
  };

  const signInWithEmailPassword = async () => {
    try {
      if (!email || !password) {
        setEmailError('Email and password are required');
        return;
      }
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        console.log('User account not found');
        alert('No User Account Found!');
        return;
      }

      dispatch(login({ id: user.uid, name: user.displayName || 'User' }));
      console.log('User signed in:', user);
      router.push(`/user/${user.uid}`);
      Cookies.set('uid', user.uid, { secure: true });
      Cookies.set('isLoggedIn', 'true', { secure: true });
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(''); // Reset error when the user types
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(''); // Reset error when the user types
  };

  return (
    <div className="h-screen w-full text-inherit">
      <div className="h-full w-full flex items-center justify-center">
        <div className="h-full w-full">
          <div className="flex flex-col hover:blur-0 h-full bg-center bg-cover items-center justify-center w-full gap-5 bg-inherit">
            <ul className="inline-flex items-center text-xl gap-10">
              <li>
                <a onClick={handleGoogleLogin} className="inline-block w-full px-6 py-3 mb-4 font-bold text-center uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a onClick={handleGithubLogin} className="inline-block w-full px-6 py-3 mb-4 font-bold text-center uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
                  <svg xmlns="http://www.w3.org/2000/svg" role="img" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github mx-auto">
                    <title>GitHub</title>
                    <path d="M9 19c-5 1.5-5-2.5-7-3M23 19v-3.87a4 4 0 0 0-1.17-2.82c.2-.5.22-1.72 0-3a3.88 3.88 0 0 0-.85-1.91c0-1.38-.44-2.27-1.09-2.72C19 5.4 20 3.6 19 2c-1 .4-2 .6-3 .6a6.3 6.3 0 0 0-5-1c-1-.05-2-.05-3 0a6.3 6.3 0 0 0-5 1c-1 .4-2 .6-3 .6-1 1.6 0 3.4 1.09 3.89C2 8.27 1.56 9.16 1.56 10.54a3.88 3.88 0 0 0-.85 1.91c-.22 1.28-.2 2.5 0 3a4 4 0 0 0-1.17 2.82V19"></path>
                  </svg>
                </a>
              </li>
            </ul>
            <div className="relative w-1/3 min-w-200 mt-6 text-center">
              <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} className="block w-full p-3 mt-2 text-lg bg-white border rounded" />
              {emailError && <div className="text-red-500">{emailError}</div>}
              <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} className="block w-full p-3 mt-2 text-lg bg-white border rounded" />
              {passwordError && <div className="text-red-500">{passwordError}</div>}
              <button onClick={signInWithEmailPassword} className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
