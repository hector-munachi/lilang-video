import { useState } from "react";
import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFieldPassword,
  EuiSpacer,
} from "@elastic/eui";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { app, firebaseDB, usersRef } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth"


const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      const {
        user: { displayName, email: userEmail, uid },
      } = await createUserWithEmailAndPassword(auth, email, password);

      if (userEmail) {
        const firestoreQuery = query(usersRef, where("uid", "==", uid));
        const fetchedUser = await getDocs(firestoreQuery);

        let displayNameFromFirestore = "";
        if (fetchedUser.docs.length === 0) {
          displayNameFromFirestore = displayName ?? name; // If displayName is not available, use the name from the form
          await addDoc(collection(firebaseDB, "users"), {
            uid,
            name: displayNameFromFirestore,
            email: userEmail,
          });
        } else {
          displayNameFromFirestore = fetchedUser.docs[0].data().name;
        }

        dispatch(setUser({ uid, email: userEmail, name: displayNameFromFirestore }));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div>
        <EuiForm component="form" onSubmit={handleSubmit}>
          <EuiFieldText
            icon="user"
            placeholder="Enter your username"
            aria-label="Enter your username."
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
          <EuiSpacer size="m" />
          <EuiFieldText
            icon="email"
            placeholder="Enter your email"
            aria-label="Enter your email."
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <EuiSpacer size="m" />
          <EuiFieldPassword
            placeholder="Enter your password"
            aria-label="Enter your password."
            type="dual"
            value={password}
            onChange={handlePasswordChange}
            required
            />
          <EuiSpacer size="m" />
        <EuiButton type="submit" fill style={{width: "100%"}}>
          Submit
        </EuiButton>
      </EuiForm>
    </div>
  )
}

export default SignUpForm