import { useState } from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import StoryDetail from "./StoryDetail";
import StoryDropDown from "./StroyDropDown";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const StyledStory = styled.div`
  display: inline-block;
  height: 450px;
  width: 350px;
  box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  margin-right: 30px;
  margin-top: 30px;
  cursor: pointer;
  overflow: hidden;
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

const StyledImgArea = styled.img({
  width: "100%",
  height: "335px",
  borderRadius: "0px 0px 30px 30px",
});




function Story({ name, body, heart, dark, id, users, setUsers, code}) {
  const [heartCheck, setHeartCheck] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  // const [code, setCode] = useState("");

  // const onCodeChange = (e) => {
  //   const { code, value } = e.target;
  //   console.log(name, value);
  //   setCode(value);
  //   setStoryOpen(false);
  // };

  
//   const note = document.createElement("div");
//   note.classList.add("note");
//   note.innerHTML = `<div class="notes">
//   <div class="main ${code ? "" : "hidden"}"></div>
//   <textarea class="${code ? "hidden" : ""}"></textarea>
// </div>`;

// const main = note.querySelector(".main");
// const textArea = note.querySelector("textarea");

// textArea.addEventListener("input", (e) => {
//   const { value } = e.target;
//   console.log(value);
//   setStoryOpen(false);
//   main.innerHTML = value;
// });

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
            display: "inline-block",
            marginLeft: "140px",
            marginTop: "5px",
          }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              setHeartCheck((res) => !res);
            }}
          >
            {heartCheck === false ? (
              <Icon size="big" name="heart" color="grey" />
            ) : (
              <Icon size="big" name="heart" color="red" />
            )}
          </div>
          <div style={{ marginLeft: "12px" }}>{heartCheck ? 1 : 0}</div>
        </div>
        <StoryDropDown
          code={code}
          name={name}
          body={body}
          id={id}
          heart={heart}
          users={users}
          setUsers={setUsers}
        />
      </StyledHearder>
      <div>
        <StyledTextArea>
          {body.length > 20 ? body.substr(0, 40) + "..." : body}

        </StyledTextArea>

      </div>
      <div style={{backgroundColor: "#dfdee3", padding:"12px", height:"inherit"}}>
          <ReactMarkdown>{code}</ReactMarkdown>
        </div>
      {/* <div class="main"></div>
    <textarea >{code}
      </textarea> */}
      <StoryDetail
        name={name}
        code={code}
        body={body}
        heart={heart}
        storyOpen={storyOpen}
        setStoryOpen={setStoryOpen}
        dark={dark}
        id={id}
      />
    </StyledStory>
  );
}

export default Story;
