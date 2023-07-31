import { useState } from 'react';
import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiSpacer,
  EuiFieldPassword,
} from "@elastic/eui";
import {
  signInWithEmailAndPassword
} from "firebase/auth";
import { firebaseAuth, firebaseDB, usersRef } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";


const LoginForm = () =>  {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      loginWithEmail(email, password);
    }
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
    } catch (error) {
      console.log(error);
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
          />
         <EuiSpacer size="m" />
          <EuiFieldPassword
            placeholder="Enter your password"
            type="dual"
            aria-label="Enter your password."
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            onKeyPress={handleKeyPress}
          />
           <EuiSpacer size="m" />
        <EuiButton type="submit" fill style={{width: "100%"}}>
          Submit
        </EuiButton>
      </EuiForm>
    </div>
  )
}

export default LoginForm;