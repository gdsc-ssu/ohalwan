import styled from "styled-components";
import { useEffect, useState } from "react";

const StyleTodayDate = styled.div({});

function TodayDate({ data }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  if (data === 1) {
    return (
      <StyleTodayDate>
        <span>{time.toLocaleTimeString("it-IT")}</span>
      </StyleTodayDate>
    );
  } else {
    return (
      <StyleTodayDate>
        <span>{time.toLocaleDateString("it-IT")}</span>
      </StyleTodayDate>
    );
  }
}

export default TodayDate;
