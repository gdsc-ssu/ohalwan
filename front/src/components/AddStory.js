import React from "react";
import { useState } from "react";
import { Button, Header, Image, Modal, Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import { db } from "../firebase";

import { useRecoilState, useSetRecoilState } from "recoil";
import { pageState, userInfo } from "../atom";

import { collection, doc, addDoc, setDoc } from "firebase/firestore";

const StyleInput = styled.textarea({
  margin: "20px",
  width: "93%",
  height: "100px",
  fontSize: "18px",
});
const StyleInputCode = styled.textarea({
  margin: "20px",
  width: "93%",
  height: "100px",
  fontSize: "18px",
});

const StyledName = styled.div`
  display: inline-block;
  width: 93%;
  font-size: 20px;
`;

const languageOptions = [
  { key: 1, text: "python", value: 1 },
  { key: 2, text: "c++", value: 2 },
  { key: 3, text: "java", value: 3 },
  { key: 4, text: "javascript", value: 4 },
  { key: 5, text: "typescript", value: 5 },
];

function AddStory({ open, setOpen, arr, setArr }) {
  const [body, setBody] = useState("");
  const [code, setCode] = useState("");
  const [codeLanguage, setCodeLanguage] = useState("");
  const [userdata, setUserdata] = useRecoilState(userInfo);
  const setPage = useSetRecoilState(pageState);

  const changeBody = (i) => {
    setBody(i.target.value);
  };
  const changeCode = (i) => {
    setCode(i.target.value);
  };
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="tiny"
    >
      <Modal.Header>스토리 추가</Modal.Header>
      <StyledName>게시글</StyledName>
      <StyleInput onChange={changeBody}></StyleInput>
      <StyledName>코드</StyledName>
      <Dropdown
        placeholder="language"
        options={languageOptions}
        selection
        onChange={(value) => {
          setCodeLanguage(value.target.outerText);
        }}
      />
      <StyleInputCode onChange={changeCode}></StyleInputCode>
      <Modal.Actions>
        <Button color="grey" onClick={() => setOpen(false)}>
          닫기
        </Button>
        <Button
          content="글쓰기"
          inverted
          color="green"
          onClick={() => {
            // const docRef = addDoc(collection(db, "local"), {
            //   name: "Tokyo",
            //   country: "Japan",
            // });
            const citiesRef = collection(db, "local");
            addDoc(
              citiesRef,
              {
                name: userdata.name,
                email: userdata.email,
                body: body,
                codeLanguage: codeLanguage,
                code: "```" + codeLanguage + "\n" + code + "\n```",
                heart: 0,
                timestamp: new Date(),
              },
              { capital: true },
              { merge: true }
            );
            setPage((cur) => !cur);
            return setOpen(false);
            // const docRef = await addDoc(collection(db, "cities"), {
            //   name: "Tokyo",
            //   country: "Japan"
            // });
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default AddStory;
