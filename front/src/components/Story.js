import { useState } from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import Markdown from "../Markdown";
import StoryDetail from "./StoryDetail";
import StoryDropDown from "./StroyDropDown";

import { useRecoilState } from "recoil";
import { userInfo } from "../atom";

const StyledStory = styled.div`
  display: inline-block;
  height: 450px;
  width: 350px;
  box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  margin-right: 30px;
  margin-top: 30px;
  cursor: pointer;
  overflow: none;
`;

const StyledHearder = styled.div({
  padding: "15px",
  display: "flex",
});
const StyledHearderImg = styled.img({
  bottom: "0px",
  height: "50px",
  width: "50px",
  borderRadius: "50px",
});
const StyledHearderText = styled.div({
  display: "inline-block",
  fontSize: "24px",
  marginLeft: "20px",
  marginTop: "15px",
});

const StyledTextArea = styled.div({
  padding: "0 15px 15px 15px",
  fontSize: "16px",
});

const StyledImgArea = styled.div({
  width: "100%",
  height: "335px",
  overflow: "hidden",
  borderRadius: "0px 0px 30px 30px",
});

function Story({ name, body, heart, dark, id, users, setUsers, code, email }) {
  const [heartCheck, setHeartCheck] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [userdata, setUserData] = useRecoilState(userInfo);

  return (
    <StyledStory
      onClick={() => {
        setStoryOpen(true);
      }}
    >
      <StyledHearder>
        <StyledHearderImg src="https://react.semantic-ui.com/images/wireframe/image.png" />
        <StyledHearderText>{name}</StyledHearderText>
        <div
          style={{
            display: "flex",
            float: "right",
            marginTop: "5px",
            marginLeft: "auto",
          }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              setHeartCheck((res) => !res);
            }}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {heartCheck === false ? (
              <Icon size="big" name="heart" color="grey" />
            ) : (
              <Icon size="big" name="heart" color="red" />
            )}
            <div style={{ textAlign: "center", marginRight: "0.25rem" }}>
              {heartCheck ? 1 : 0}
            </div>
          </div>
          {userdata.email === email ? (
            <StoryDropDown
              name={name}
              body={body}
              id={id}
              heart={heart}
              users={users}
              setUsers={setUsers}
            />
          ) : null}
        </div>
      </StyledHearder>
      <StyledTextArea>
        {body.length > 20 ? body.substr(0, 40) + "..." : body}
      </StyledTextArea>
      <StyledImgArea>
        <Markdown code={code} />
      </StyledImgArea>
      <StoryDetail
        name={name}
        body={body}
        heart={heart}
        storyOpen={storyOpen}
        setStoryOpen={setStoryOpen}
        dark={dark}
        id={id}
        code={code}
      />
    </StyledStory>
  );
}

export default Story;
