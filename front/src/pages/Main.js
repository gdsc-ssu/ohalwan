import styled from "styled-components";
import React from "react";
import { Button } from "semantic-ui-react";
import Story from "../components/Story";
import { useState, useEffect } from "react";
import AddStory from "../components/AddStory";
import { db } from "../firebase";
import { getDocs } from "firebase/firestore";
import { collection, addDoc, setDoc } from "firebase/firestore";

const StyledMain = styled.div`
  height: 2000px;
  padding-top: 30px;
  color: ${(props) => (props.dark === true ? "white" : "black")};
  background-color: ${(props) => (props.dark === false ? "white" : "#777")};
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

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "local");

  // 시작될때 한번만 실행
  useEffect(() => {
    // 비동기로 데이터 받을준비
    const getUsers = async () => {
      // getDocs로 컬렉션안에 데이터 가져오기
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);
  useEffect(() => {
    console.log(users);
    setArr(users);
  }, [users]);

  return (
    <StyledMain dark={darkmode}>
      <MainBody>
        <MainBodyTop>
          <div style={{ marginTop: "100px" }}>
            <MainText>---님 환영합니다!</MainText>
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
            ? arr.map((cur) => <Story dark={darkmode} {...cur} />)
            : "nodata"}
        </MainBodyBottom>

        <AddStory
          open={storyOpen}
          setOpen={setStoryOpen}
          arr={arr}
          setArr={setArr}
        />
      </MainBody>
    </StyledMain>
  );
}

export default Main;
