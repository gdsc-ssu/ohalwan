import styled from "styled-components";
import React from "react";
import { Button } from "semantic-ui-react";
import Story from "../components/Story";
import { useState, useEffect } from "react";
import AddStory from "../components/AddStory";

import { db, auth, apiKey } from "../firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { useRecoilState } from "recoil";
import { pageState, loginState, userInfo } from "../atom";
import First from "./First";

export const StyledPage = styled.div`
  height: 2000px;
  overflow: auto;
  padding-top: 30px;
  // color: ${(props) => (props.dark === true ? "white" : "black")};
  // background-color: ${(props) =>
    props.dark === false ? "white" : "#18181b"};
  color: white;
  background-color: #18181b;
`;

const MainBody = styled.div({
  paddingLeft: "100px",
  paddingRight: "100px",
});

const MainBodyTop = styled.div({});

const MainBodyBottom = styled.div({
  marginTop: "80px",
});

const MainText = styled.div`
  display: block;
  font-size: 40px;
  height: 50px;
`;

function Main({ darkmode, setDarkmode }) {
  const [arr, setArr] = useState([]);
  const [storyOpen, setStoryOpen] = useState(false);
  const [page, setPage] = useRecoilState(pageState);
  const [login, setLogin] = useRecoilState(loginState);
  const [userdata, setUserData] = useRecoilState(userInfo);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "local");

  useEffect(() => {
    setPage((cur) => !cur);
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("AAAA");
      } else {
        console.log("BBBB");
      }
    });
  }, []);

  useEffect(() => {
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_login = sessionStorage.getItem(_session_key);
    if (is_login && login === false) {
      setLogin((cur) => !cur);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserData({
            name: user.displayName,
            email: user.email,
            accessToken: user.accessToken,
          });
        } else {
          signOut();
        }
      });
    }
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(
        query(usersCollectionRef, orderBy("timestamp", "desc"))
      );
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, [page]);
  useEffect(() => {
    // onAuthStateChanged(auth, (user) => console.log(user));
  }, []);

  useEffect(() => {
    // console.log(users);
    setArr(users);
    // console.log("users", users);
  }, [users]);

  if (login) {
    return (
      <StyledPage dark={darkmode}>
        <MainBody>
          <MainBodyTop>
            <div style={{ marginTop: "100px" }}>
              <MainText>{userdata.name}님 환영합니다!</MainText>
              <MainText>오늘 알고리즘 완료하셨나요?</MainText>
            </div>
            <div
              style={{ display: "inline-block" }}
              onClick={() => {
                setStoryOpen(true);
              }}
            >
              <Button size="big" style={{ float: "right" }}>
                글쓰기
              </Button>
            </div>
          </MainBodyTop>
          <MainBodyBottom>
            {arr.length > 0
              ? arr.map((cur) => (
                  <Story
                    dark={darkmode}
                    {...cur}
                    users={users}
                    setUsers={setUsers}
                  />
                ))
              : "nodata"}
          </MainBodyBottom>

          <AddStory
            open={storyOpen}
            setOpen={setStoryOpen}
            arr={arr}
            setArr={setArr}
          />
        </MainBody>
      </StyledPage>
    );
  } else {
    return <First darkmode={darkmode} />;
  }
}

export default Main;
