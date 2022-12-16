import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import styled from "styled-components";
import { db } from "../firebase";

import { useSetRecoilState } from "recoil";
import { pageState } from "../atom";

import { collection, addDoc, setDoc, doc } from "firebase/firestore";

const StyleInput = styled.textarea({
  margin: "20px",
  width: "93%",
  height: "200px",
  fontSize: "18px",
});

function UpdateStory({ open, setOpen, id, text, name, heart }) {
  const [body, setBody] = useState("");
  const setPage = useSetRecoilState(pageState);
  const changeBody = (i) => {
    setBody(i.target.value);
  };
  //   useEffect(() => {
  //     if (open) {
  //       setBody(text);
  //       console.log(body);
  //     }
  //   });
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="tiny"
    >
      <Modal.Header>스토리 수정</Modal.Header>
      <StyleInput onChange={changeBody}>{text}</StyleInput>
      <Modal.Actions>
        <Button color="grey" onClick={() => setOpen(false)}>
          닫기
        </Button>
        <Button
          content="글쓰기"
          inverted
          color="green"
          onClick={() => {
            const updateUsers = async () => {
              const updateDoc = doc(db, "local", id);
              await setDoc(updateDoc, {
                name: name,
                body: body,
                timestamp: new Date(),
                heart: heart,
              });
            };
            updateUsers();
            setPage((cur) => !cur);
            setOpen(false);
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default UpdateStory;
