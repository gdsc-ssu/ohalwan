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
  text-align: center;
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
const LoginForm = styled.div``;
function SignUp({ darkmode, setDarkmode }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [passwd, setPasswd] = useState("");
  const [confirmPasswd, setConfirmPasswd] = useState("");

  function onChangeEmail(i) {
    setEmail(i.target.value);
  }
  function onChangeName(i) {
    setName(i.target.value);
  }
  function onChangePasswd(i) {
    setPasswd(i.target.value);
  }
  function onChangeConfirmPasswd(i) {
    setConfirmPasswd(i.target.value);
  }

  const checkCorrectPassword = (passwd, confirmPasswd) => {
    if (passwd === confirmPasswd) return true;
    else return false;
  };

  const checkEmail = (email) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!emailRegex.test(email)) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <StyledPage dark={darkmode}>
      <LoginBody>
        <LoginBox>
          <H1Text>회원가입</H1Text>
          <LoginForm>
            <LoginText>이메일</LoginText>
            <LoginInput onChange={onChangeEmail}></LoginInput>
            <LoginText>닉네임</LoginText>
            <LoginInput onChange={onChangeName}></LoginInput>
            <LoginText>비밀번호</LoginText>
            <LoginInput onChange={onChangePasswd}></LoginInput>
            <LoginText>비밀번호 확인</LoginText>
            <LoginInput onChange={onChangeConfirmPasswd}></LoginInput>
            <LoginButton
              onClick={() => {
                if (email && name && passwd && confirmPasswd) {
                  if (checkCorrectPassword(passwd, confirmPasswd)) {
                    console.log(email, name, passwd, confirmPasswd);
                    if (checkEmail(email)) {
                    } else {
                      window.alert("올바른 이메일 형식을 사용해주세요");
                    }
                  } else {
                    window.alert("비밀번호를 확인해 주세요!");
                  }
                } else {
                  window.alert("모든 항목을 작성해주세요!");
                }
              }}
            >
              회원가입
            </LoginButton>
          </LoginForm>
        </LoginBox>
      </LoginBody>
    </StyledPage>
  );
}

export default SignUp;
