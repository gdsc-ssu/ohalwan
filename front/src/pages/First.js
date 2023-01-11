import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import TodayDate from "../components/TodayDate";

const StyledFirst = styled.div`
  height: 100vh;
  // color: ${(props) => (props.dark === true ? "white" : "black")};
  // background-color: ${(props) =>
    props.dark === false ? "white" : "#18181b"};
  color: white;
  background-color: #18181b;
`;

const StyledBody = styled.div`
  padding-top: 110px;
  width: 80%;
  margin-left: 10%;
`;

const StyledText = styled.div`
  font-size: 80px;
  padding: 0px;
  text-align: center;
  padding: 50px;
  // color: ${(props) => (props.dark === true ? "white" : "black")};
  color: white;
`;

function First({ darkmode }) {
  return (
    <StyledFirst dart={darkmode}>
      <StyledBody>
        <StyledText dark={darkmode}>오늘 알고리즘</StyledText>
        <StyledText dark={darkmode}>완료하셨나요?</StyledText>
        <StyledText dark={darkmode}>
          <div style={{ marginBottom: "100px" }}>
            <TodayDate data={1} />
          </div>
          <div>
            <TodayDate data={2} />
          </div>
        </StyledText>
        <div style={{ marginLeft: "40%" }}>
          <Link to="/login">
            <Button>
              <h2>알고리즘 풀러가기</h2>
            </Button>
          </Link>
        </div>
      </StyledBody>
    </StyledFirst>
  );
}

export default First;
