import { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiPanel,
  EuiProvider,
  EuiSpacer,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import logo from "../assets/lilang-logo.svg";
import poster from "../assets/poster.png";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth, firebaseDB, usersRef } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";

function Login() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName, email, uid },
    } = await signInWithPopup(firebaseAuth, provider);

    if (email) {
      const firestoreQuery = query(usersRef, where("uid", "==", uid));
      const fetchedUser = await getDocs(firestoreQuery);
      if (fetchedUser.docs.length === 0) {
        await addDoc(collection(firebaseDB, "users"), {
          uid,
          name: displayName,
          email,
        });
      }
      dispatch(setUser({ uid, email: email!, name: displayName! }));
      navigate("/");
    }
  };
  return (
    <EuiProvider colorMode="dark">
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <EuiFlexItem grow={false}>
          <EuiPanel paddingSize="xl">
            <EuiFlexGroup justifyContent="center" alignItems="center">
              <EuiFlexItem>
              <EuiFlexGroup justifyContent="center" alignItems="center">
                <img src={logo} alt="logo" style={{ width: "400px", height: "100px"}} />
                </EuiFlexGroup>
                <EuiSpacer size="xs" />
                <EuiText textAlign="center" grow={false}>
                  <h3>
                    <EuiTextColor color="#B36ED4">Learn Literature + Language</EuiTextColor>
                  </h3>
                </EuiText>
                <EuiImage src={poster} alt="logo" style={{ width: "400px" }} />
              </EuiFlexItem>
              <EuiFlexItem>
             
                <div>
                {showLogin ? <LoginForm /> : <SignUpForm />}
                <EuiSpacer size="m" />
                <EuiText>
                  {showLogin ? "You need to register? " : "Already registered? " }
                  <span
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={toggleForm}
                  >
                    here
                  </span>
                  .
                </EuiText>
                </div>
                
                <EuiSpacer size="l" />
                <EuiText textAlign="center" color="#B36ED4">Or</EuiText>

                <EuiSpacer size="l" />
                <EuiButton fill onClick={login}>
                  Login with Google
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  );
}

export default Login;
