import React, { Component } from "react";
import { useState } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import styled from "styled-components";
import { db } from "../firebase";

import { useSetRecoilState } from "recoil";
import { pageState } from "../atom";

import { collection, doc, addDoc, setDoc } from "firebase/firestore";

import ReactMarkDown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  docco,
  dark,
  ocean,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import language from "react-syntax-highlighter/dist/esm/languages/hljs/1c";
// import ReactMarkDown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import {
//   vscDarkPlus,
//   docco
// } from "react-syntax-highlighter/dist/esm/styles/prism";

const StyleInput = styled.textarea({
  margin: "20px",
  width: "93%",
  height: "200px",
  fontSize: "18px",
});

function AddStory({ open, setOpen, arr, setArr }) {
  const [body, setBody] = useState("");
  const [input, setInput] = useState();
  const setPage = useSetRecoilState(pageState);

  const changeBody = (i) => {
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
      <div>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          style={{
            margin: "20px",
            width: "93%",
            height: "200px",
            fontSize: "18px",
          }}
          autoFocus
          value={input}
        />
        <ReactMarkDown
          // source={input}
          components={{ code: Markdown }}
          children={input}
          className="markdown"
        />
      </div>
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
                name: "최상원",
                body: body,
                code: input,
                heart: 0,
                timestamp: new Date(),
              },
              { capital: true },
              { merge: true },
            );
            setPage((cur) => !cur);
            console.log("d");
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
const Markdown = (props) => {
  const codeInput = props.children[0];
  const language = props.className?.slice(9);
  console.log(language);
  return (
    <SyntaxHighlighter style={ocean} language={language} showLineNumbers={true}>
      {codeInput ?? ""}
    </SyntaxHighlighter>
  );
};

export default AddStory;
