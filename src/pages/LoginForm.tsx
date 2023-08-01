import { useState } from 'react';
import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiSpacer,
  EuiFieldPassword,
} from "@elastic/eui";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth, firebaseDB, usersRef } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";



// Create a type for the Firebase Auth error
interface FirebaseAuthError {
  code: string;
  message: string;
  // You can add more properties if needed
}

const LoginForm = () =>  {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginWithEmail(email, password);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };


  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginWithEmail = async (email: string, password: string) => {
    try {
      const {
        user: { displayName, email: userEmail, uid },
      } = await signInWithEmailAndPassword(firebaseAuth, email, password);

      if (userEmail) {
        const firestoreQuery = query(usersRef, where("uid", "==", uid));
        const fetchedUser = await getDocs(firestoreQuery);
        if (fetchedUser.docs.length === 0) {
          await addDoc(collection(firebaseDB, "users"), {
            uid,
            name: displayName,
            email: userEmail,
          });
        }
        dispatch(setUser({ uid, email: userEmail, name: displayName! }));
        navigate("/");
      }
    }catch (error: FirebaseAuthError | any) { // Specify FirebaseAuthError type
      // Handle specific errors and set appropriate error message
      if (error.code === "auth/invalid-email" || error.code === "auth/wrong-password") {
        setError("Invalid credentials. Please check your email and password.");
      } else if (error.code === "auth/user-not-found") {
        setError("User does not exist. Please sign up first.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }

  
  return (
    <div>
      <EuiForm component="form" onSubmit={handleSubmit}>
          <EuiFieldText
            icon="email"
            placeholder="Enter your email"
            aria-label="Enter your email."
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            required
          />
         <EuiSpacer size="m" />
          <EuiFieldPassword
            placeholder="Enter your password"
            type="dual"
            aria-label="Enter your password."
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            required
          />
           <EuiSpacer size="m" />
        <EuiButton type="submit" fill style={{width: "100%"}}>
          Submit
        </EuiButton>
      </EuiForm>
      {error && <div style={{ color: "red" }}>{error}</div>} 
    </div>
  )
}

export default LoginForm;