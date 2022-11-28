import styled from "styled-components";

const StyledStory = styled.div`
  display: inline-block;
  height: 450px;
  width: 350px;
  box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  margin-right: 30px;
  margin-top: 30px;
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

function Story({ name, body }) {
  return (
    <StyledStory>
      <StyledHearder>
        <StyledHearderImg src="https://react.semantic-ui.com/images/wireframe/image.png" />
        <StyledHearderText>{name}</StyledHearderText>
      </StyledHearder>
      <StyledTextArea>
        {body.length > 20 ? body.substr(0, 40) + "..." : body}
      </StyledTextArea>
      <StyledImgArea src="https://react.semantic-ui.com/images/wireframe/image.png" />
    </StyledStory>
  );
}

export default Story;
