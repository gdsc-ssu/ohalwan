import styled from "styled-components";

const StyleTodayDate = styled.div({});

function TodayDate() {
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  let day = today.getDay(); // 요일

  return (
    <StyleTodayDate>
      {year} / {month} / {date} / {day}
    </StyleTodayDate>
  );
}

export default TodayDate;
