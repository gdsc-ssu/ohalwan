import { Button, Icon } from "semantic-ui-react";
import styled from "styled-components";

const StyledHearder = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  border-bottom: 1px solid #e1e1e1;
  background-color: white;
  // background: 'linear-gradient(90.22deg, #496ACE -1.38%, #715DEB 92.8%)',
  background-color: ${(props) => (props.dark === false ? "white" : "#666666")};
  color: ${(props) => (props.dark === true ? "white" : "black")};
`;
const StyledText = styled.div`
  display: inline-block;
  font-size: 30px;
  padding: 20px 0 0 20px;
`;

function Headers({ darkmode, setDarkmode }) {
  return (
    <StyledHearder dark={darkmode}>
      <StyledText>오알완</StyledText>
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
