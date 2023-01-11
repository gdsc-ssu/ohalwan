import { auth } from "../firebase";
import { signOut } from "firebase/auth";

import { Button, Icon } from "semantic-ui-react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../atom";

const StyledHearder = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  border-bottom: 1px solid #e1e1e1;
  background-color: white;
  // background: 'linear-gradient(90.22deg, #496ACE -1.38%, #715DEB 92.8%)',
  // background-color: ${(props) =>
    props.dark === false ? "white" : "#18181b"};
  background-color: #18181b;
  // color: ${(props) => (props.dark === true ? "white" : "black")};
  color: white;
`;
const StyledText = styled.div`
  display: inline-block;
  font-size: 30px;
  padding: 20px 0 0 20px;
  cursor: pointer;
  // color: ${(props) => (props.dark === true ? "white" : "black")};
  color: white;
`;

function Headers({ darkmode, setDarkmode }) {
  const [login, setLogin] = useRecoilState(loginState);

  const logout = async () => {
    await signOut(auth).then(() => {
      setLogin(false);
    });
  };
  return (
    <StyledHearder dark={darkmode}>
      <Link to="/">
        <StyledText dark={darkmode}>오알완</StyledText>
      </Link>
      <div
        style={{
          display: "inline",
          cursor: "pointer",
          float: "right",
          margin: "10px",
        }}
      >
        {login ? (
          <Link to="/login">
            <Button>내정보</Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button>로그인</Button>
          </Link>
        )}
      </div>
      <div
        style={{
          display: "inline",
          float: "right",
          marginTop: "15px",
          marginRight: "50px",
          cursor: "pointer",
        }}
        onClick={() => {
          setDarkmode((res) => !res);
        }}
      >
        {darkmode ? (
          <Icon name="circle outline" size="big"></Icon>
        ) : (
          <Icon name="circle" size="big"></Icon>
        )}
      </div>
    </StyledHearder>
  );
}

export default Headers;
