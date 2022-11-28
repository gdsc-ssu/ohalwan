import React from "react";
import { useState } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import styled from "styled-components";

const StyleInput = styled.textarea({
  margin: "20px",
  width: "93%",
  height: "200px",
  fontSize: "18px",
});

function AddStory({ open, setOpen, arr, setArr }) {
  const [body, setBody] = useState("");
  const changeBody = (i) => {
    console.log(i);
    setBody(i.target.value);
  };
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="tiny"
    >
      <Modal.Header>스토리 추가</Modal.Header>
      <StyleInput onChange={changeBody}></StyleInput>
      <Modal.Actions>
        <Button color="grey" onClick={() => setOpen(false)}>
          닫기
        </Button>
        <Button
          content="글쓰기"
          inverted
          color="green"
          onClick={() => {
            const curarr = [...arr];
            curarr.push({ name: "최상원", body: body });
            setArr(curarr);
            return setOpen(false);
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default AddStory;
