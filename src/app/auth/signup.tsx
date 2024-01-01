'use client'
// Import the necessary Firebase modules
import React, { useState } from "react";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, getAuth, GithubAuthProvider, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, database } from "../firebase";
import { getDatabase, ref, set, get } from "firebase/database";
import { Apple, Facebook, Google } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Account from "../user/[uid]/page";

export default function Signup() {
  // State for form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [name, setName] = useState("");

  // Validation errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");
  const [nameError,setNameError]=useState("")
   const router = useRouter();
  // Function to handle email input change
  const handleEmailChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setEmail(e.target.value);
    setEmailError(""); // Reset error when user types
  };
  const handleNameChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setName(e.target.value);
    setNameError("");
}
  // Function to handle password input change
  const handlePasswordChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setPassword(e.target.value);
    setPasswordError(""); // Reset error when user types
  };

  // Function to handle terms checkbox change
  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setTermsChecked(e.target.checked);
  setTermsError(""); // Reset error when user checks/unchecks
};


 const signIn = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Send verification email
    const user = userCredential.user;
    await sendEmailVerification(user);

    // Check if the user already exists in the database
    const userRef = ref(database, `users/${user.uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      // User already exists
      console.log("User already exists");
      // You can set an error state here and display a message to the user
      return;
    }

    // Create a user in the database with UID
    await set(userRef, {
      email: user.email,
      providerId: user.providerData[0].providerId,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: Date.now(),
      lastLogin: Date.now(),
      // Add other user details if needed
    });

    alert("Verification email sent");
     setUserActive(true, user.uid);

    // Redirect the user to the sign-in page after successful registration
    // You can use a library like react-router-dom for navigation
    // Example: history.push("/sign-in");
  } catch (err:any) {
    // Check for specific error codes
    if (err.code === "auth/email-already-in-use") {
      console.error("Email already in use:", err.message);
      // Set an error state and display a message to the user
    } else {
      console.error(err);
    }
  }
};


  // Function to handle GitHub login
  const handleGitHubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        // Check if the user already exists in the database
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);

        if (!snapshot.exists()) {
          // Create a user in the database with GitHub UID
          await set(userRef, {
             email: user.email,
        providerId: user.providerData[0].providerId,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: Date.now(),
        lastLogin:Date.now()
            // Add other user details if needed
          });
        }

        console.log("GitHub login successful");
        // Additional logic if needed
        const setUserActive = (isActive: boolean, userId: string) => {
setUserActive(true, user.uid);
        }; 

      }
    } catch (error) {
      console.error("GitHub login failed:", error);
    }
  };

// Function to handle Google login
const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (user) {
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        await set(userRef, {
          email: user.email,
          providerId: user.providerData[0].providerId,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: Date.now(),
          lastLogin: Date.now(),
        });
      }
      router.push(`../user/${user.uid}`);

      console.log("Google login successful");
      setUserActive(true, user.uid);
      
    }
  } catch (error) {
    console.error("Google login failed:", error);
  }
};


  // Function to handle form submission
  const handleSubmit = async () => {
    // Validate form fields
    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    if (!termsChecked) {
      setTermsError("You must agree to the Terms and Conditions");
      return;
    }
    if(!name){
      setNameError("Enter Your Name")
    }

    // Call the signIn function for user registration
    await signIn();
  };

    return <>
      <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0">
        <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
          <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
            <h5>Register with</h5>
          </div>
          <div className="flex flex-wrap px-3 -mx-3 sm:px-6 xl:px-12">
            <div className="w-3/12 max-w-full px-1 ml-auto flex-0">
              <a className="inline-block w-full px-6 py-3 mb-4 font-bold text-center uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
                <Facebook></Facebook>
              </a>
            </div>
            <div className="w-3/12 max-w-full px-1 flex-0" onClick={handleGitHubLogin}>
              <a className="inline-block w-full px-6 py-3 mb-4 font-bold text-center uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
                <Apple></Apple>
              </a>
            </div>
            <div className="w-3/12 max-w-full px-1 mr-auto flex-0" onClick={handleGoogleLogin}>
              <a className="inline-block w-full px-6 py-3 mb-4 font-bold text-center  uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
                <Google></Google>
              </a>
            </div>
            <div className="relative w-full max-w-full px-3 mt-2 text-center shrink-0">
              <p className="z-20 inline px-4 mb-2 font-semibold leading-normal bg-white text-sm text-slate-400">or</p>
            </div>
          </div>
          <div className="flex-auto p-6">
            <form role="form text-left">
              <div className="mb-4">
                <input onChange={handleNameChange} aria-aria-describedby="name-addon"aria-label="Full name" placeholder="Full name"className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" type="text" value={name}></input>
              </div>
              <div className="mb-4">
                <input aria-describedby="email-addon" aria-label="Email" placeholder="Email" className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" type="email" value={email}
                  onChange={handleEmailChange} />  {emailError && <p className="text-red-500">{emailError}</p>}
              </div>
              <div className="mb-4">
                <input aria-describedby="password-addon" aria-label="Password" placeholder="Password" className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" type="password" value={password}
                  onChange={handlePasswordChange} />{passwordError && <p className="text-red-500">{passwordError}</p>}
              </div>
              <div className="min-h-6 pl-7 mb-0.5 block">
                <input onChange={handleTermsChange} value='' checked={termsChecked} type="checkbox" className="w-5 h-5 ease-soft -ml-7 rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-200 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" id="terms" />
                <label htmlFor="terms" className="mb-2 ml-1 font-normal cursor-pointer select-none text-sm text-slate-700"> I agree the <a className="font-bold text-slate-700">Terms and Conditions</a>
                  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline ml-1 fill-current text-green-500">
                    <path d="M6.293 9.293a1 1 0 0 1 1.414 0L10 10.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"></path>
                  </svg>
                  {termsError && <p className="text-red-500">{termsError}</p>}
                </label>
              </div>

              <div className="text-center">
                <button className="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white" type="button" onClick={signIn} onFocus={handleSubmit}>Sign up</button>
              </div>
              <p className="mt-4 mb-0 leading-normal text-sm">Already have an account? <a className="font-bold text-slate-700" href="../pages/sign-in.html">Sign in</a></p>
            </form>
          </div>
        </div>
      </div>
    </>
  }

function setUserActive(arg0: boolean, uid: string) {
  throw new Error("Function not implemented.");
}
