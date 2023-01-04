import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import styled from "styled-components";

const StyledFirst = styled.div``;

function First() {
  return (
    <StyledFirst>
      <h1>오알완!</h1>
      <h3>로그인 해주세요.</h3>
      <Link to="/login">
        <Button>로그인하기</Button>
      </Link>
    </StyledFirst>
  );
}

export default First;
