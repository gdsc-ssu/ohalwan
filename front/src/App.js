import { useEffect, useState } from "react";
import Headers from "./pages/Header";
import Main from "./pages/Main";
import { db } from "./firebase";
import { getDocs } from "firebase/firestore";
import { collection, addDoc, setDoc } from "firebase/firestore";
import { RecoilRoot } from "recoil";

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
    <RecoilRoot>
      <div className="App">
        <Headers darkmode={darkmode} setDarkmode={setDarkmode} />
        <Main darkmode={darkmode} setDarkmode={setDarkmode} />
      </div>
    </RecoilRoot>
  );
}

export default App;
