import { useEffect, useState } from "react";
import Headers from "./pages/Header";
import Main from "./pages/Main";
import { db, apiKey } from "./firebase";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Login from "./pages/Login";

import { useRecoilState } from "recoil";
import { pageState, loginState, userInfo } from "./atom";
import SignUp from "./pages/SignUp";

function App() {
  const [darkmode, setDarkmode] = useState(false);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "cities");

  // 시작될때 한번만 실행
  useEffect(() => {
    // 비동기로 데이터 받을준비
    const getUsers = async () => {
      // getDocs로 컬렉션안에 데이터 가져오기
      const data = await getDocs(usersCollectionRef);
      // console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  useEffect(() => {
    // console.log(users);
  }, [users]);
  return (
    <div></div>
    // <BrowserRouter>
    //   <RecoilRoot>
    //     <Headers darkmode={darkmode} setDarkmode={setDarkmode} />
    //     <Routes>
    //       <Route
    //         path="/*"
    //         element={<Main darkmode={darkmode} setDarkmode={setDarkmode} />}
    //       ></Route>
    //       <Route
    //         path="/"
    //         element={<Main darkmode={darkmode} setDarkmode={setDarkmode} />}
    //       />
    //       <Route
    //         path="/login"
    //         element={<Login darkmode={darkmode} setDarkmode={setDarkmode} />}
    //       />
    //       <Route
    //         path="/signup"
    //         element={<SignUp darkmode={darkmode} setDarkmode={setDarkmode} />}
    //       />
    //     </Routes>
    //   </RecoilRoot>
    // </BrowserRouter>
  );
}

export default App;
