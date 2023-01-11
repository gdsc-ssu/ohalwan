import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Main, { StyledPage } from "./Main";
import { Button } from "semantic-ui-react";

import { db } from "../firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

import { useResetRecoilState, useRecoilState } from "recoil";
import { loginState, pageState, userInfo } from "../atom";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// import {
//   getAuth,
//   setPersistence,
//   signInWithEmailAndPassword,
//   browserSessionPersistence,
// } from "firebase/auth";

// setPersistence(auth, browserSessionPersistence)
//   .then(() => {
//     // Existing and future Auth states are now persisted in the current
//     // session only. Closing the window would clear any existing state even
//     // if a user forgets to sign out.
//     // ...
//     // New sign-in will be persisted with session persistence.
//     return signInWithEmailAndPassword(auth, email, password);
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

const LoginBody = styled.div`
  padding-top: 100px;
  padding-left: 32vw;
  padding-right: 100px;
`;

const LoginBox = styled.div`
  width: 500px;
  height: 600px;
  background-color: #999999;
  border: 1px solid black;
  border-radius: 30px;
`;
const H1Text = styled.div`
  margin-top: 40px;
  margin-bottom: 50px;
  font-size: 35px;
  border-radius: 20px;
  font-weight: bolder;
`;
const LoginText = styled.div`
  font-size: 20px;
  margin-left: 50px;
  margin-right: 50px;
`;
const LoginInput = styled.input`
  font-size: 20px;
  margin: 10px 50px 30px 50px;
  border: none;
  width: 400px;
  height: 40px;
  background-color: #d9d9d9;
`;
const LoginButton = styled.button`
  width: 400px;
  height: 70px;
  margin: 10px 50px 30px 50px;
  background-color: #555555;
  color: white;

  border-radius: 30px;
  font-size: 25px;
`;
const GoogleLoginButton = styled.button`
  width: 400px;
  height: 70px;
  margin: 10px 50px 30px 50px;
  background-color: #555555;
  color: white;
  border: 0px;
  border-radius: 30px;
  font-size: 25px;
`;

const LoginForm = styled.div``;

function Login({ darkmode }) {
  const [userData, setUserData] = useRecoilState(userInfo);
  const setPage = useResetRecoilState(pageState);
  const [login, setLogin] = useRecoilState(loginState);
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");

  const navigate = useNavigate();

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // 사용자 로그인 시 동작
  //     console.log("login");
  //     return;
  //   }
  //   // 사용자 로그아웃 시 동작
  //   console.log("logout");
  // });

  const loginIdChange = (i) => {
    setId(i.target.value);
    console.log(id);
  };
  const loginPasswdChange = (i) => {
    setPasswd(i.target.value);
  };

  function handleGoogleLogin() {
    setPersistence(auth, browserSessionPersistence).then(() => {
      const provider = new GoogleAuthProvider(); // provider를 구글로 설정
      signInWithPopup(auth, provider) // popup을 이용한 signup
        .then((data) => {
          // setUserData(data.user); // user data 설정
          console.log(data); // console로 들어온 데이터 표시
          const citiesRef = doc(db, "users", data.user.email);
          setDoc(
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
          setUserData({
            name: data.user.displayName,
            email: data.user.email,
            accessToken: data.user.accessToken,
          });
          setLogin(true);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  const logout = async () => {
    await signOut(auth).then(() => {
      setLogin(false);
      navigate("/");
    });
  };
  console.log(darkmode);
  return (
    <StyledPage dark={darkmode}>
      <LoginBody>
        <LoginBox>
          <H1Text style={{ textAlign: "center" }}>로그인</H1Text>
          <LoginForm>
            <LoginText>아이디</LoginText>
            <LoginInput onChange={loginIdChange}></LoginInput>
            <LoginText>비밀번호</LoginText>
            <LoginInput onChange={loginPasswdChange}></LoginInput>
            <LoginButton
              onClick={() => {
                console.log(id, passwd);
              }}
            >
              로그인
            </LoginButton>
          </LoginForm>

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
