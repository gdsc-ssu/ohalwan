import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Main, { StyledPage } from "./Main";
import { Button } from "semantic-ui-react";

import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

import { useResetRecoilState, useRecoilState } from "recoil";
import { loginState, pageState } from "../atom";
import { useNavigate } from "react-router-dom";

const LoginBody = styled.div`
  padding-top: 100px;
  padding-left: 35vw;
  padding-right: 100px;
`;

const LoginBox = styled.div`
  width: 400px;
  height: 300px;
  border: 1px solid black;
`;

function Login({ darkmode }) {
  const [userData, setUserData] = useState(null);
  const setPage = useResetRecoilState(pageState);
  const [login, setLogin] = useRecoilState(loginState);

  const navigate = useNavigate();

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then((data) => {
        setUserData(data.user); // user data 설정
        console.log(data); // console로 들어온 데이터 표시
        const citiesRef = collection(db, "users");
        addDoc(
          citiesRef,
          {
            name: data.user.displayName,
            email: data.user.email,
            accessToken: data.user.accessToken,
            timestamp: new Date(),
          },
          { capital: true },
          { merge: true }
        );
        setLogin(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const logout = async () => {
    await signOut(auth).then(() => {
      setLogin(false);
    });
  };
  return (
    <StyledPage dark={darkmode}>
      <LoginBody>
        <LoginBox>
          {login ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Button onClick={handleGoogleLogin}>Google Login</Button>
          )}
        </LoginBox>
      </LoginBody>
    </StyledPage>
  );
}

export default Login;
