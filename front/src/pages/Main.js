import styled from "styled-components";
import React from "react";
import { Button } from "semantic-ui-react";
import Story from "../components/Story";
import { useState } from "react";
import AddStory from "../components/AddStory";

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
  const addStory = () => {
    const curarr = [...arr];
    curarr.push({ name: "최상원", body: "" });
    setArr(curarr);
  };

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
