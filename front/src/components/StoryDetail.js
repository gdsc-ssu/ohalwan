import { useEffect, useState } from "react";
import { Modal, Button } from "semantic-ui-react";
import styled from "styled-components";
import { db } from "../firebase";
import { getDocs } from "firebase/firestore";
import { collection, addDoc, query, orderBy } from "firebase/firestore";

const StyledReview = styled.div`
  //background-color: ${(props) =>
    props.dark === false ? "white" : "#777777"};
  padding: 20px;
  height: 500px;
  overflow: auto;
`;

const StyledReviewLi = styled.div`
  font-size: 16px;
  border-bottom: 1px #e1e1e1 solid;
  display: flex;
`;

const StyledReviewHeader = styled.div`
  width: 70px;
  padding: 10px;
`;
const StyledReviewText = styled.div`
  display: inline-block;
  margin-top: 20px;
  width: 50px;
`;

function StoryDetail({ name, body, heart, storyOpen, setStoryOpen, dark, id }) {
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [changeReview, setChangeReview] = useState(false);

  const usersCollectionRef = collection(db, `local/${id}/comment`);

  useEffect(() => {
    const getReview = async () => {
      const data = await getDocs(
        query(usersCollectionRef, orderBy("timestamp", "desc"))
      );
      const result = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        key: doc.id,
      }));
      setReview(result);
    };
    if (open) {
      getReview();
    }
  }, [changeReview]);

  const changeBody = (i) => {
    setReviewText(i.target.value);
  };
  useEffect(() => {
    setStoryOpen(open);
    setChangeReview((res) => !res);
  }, [open]);
  useEffect(() => {
    setOpen(storyOpen);
  }, [storyOpen]);
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
    >
      <Modal.Header>{name}</Modal.Header>
      <Modal.Content>{body}</Modal.Content>
      <StyledReview dark={dark}>
        <h3>댓글 목록</h3>
        <textarea
          style={{ width: "70%", height: "40px" }}
          onChange={changeBody}
        ></textarea>
        <div
          style={{
            display: "inline-block",
            width: "30%",
            marginBottom: "10px",
          }}
        >
          <Button
            content="댓글추가"
            inverted
            onClick={() => {
              // const curreview = [...review];
              // curreview.push({ name: "최상원", review: reviewText });
              // setReview(curreview);
              const citiesRef = collection(db, `local/${id}/comment`);
              addDoc(
                citiesRef,
                {
                  name: "최상원",
                  text: reviewText,
                  timestamp: new Date(),
                },
                { capital: true },
                { merge: true }
              );
              setChangeReview((res) => !res);
              // setReview(curarr);
            }}
            positive
          />
        </div>
        <div style={{ border: `1px solid black` }}>
          {review.map((e) => {
            return (
              <StyledReviewLi>
                <StyledReviewHeader>{e.name}</StyledReviewHeader>
                <StyledReviewText>{e.text}</StyledReviewText>
              </StyledReviewLi>
            );
          })}
        </div>
      </StyledReview>
      <Modal.Actions>
        <Button color="grey" onClick={() => setOpen(false)}>
          닫기
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
export default StoryDetail;
