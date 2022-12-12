import { useEffect, useState } from "react";
import Headers from "./pages/Header";
import Main from "./pages/Main";
import { db } from "./firebase";
import { getDocs } from "firebase/firestore";
import { collection, addDoc, setDoc } from "firebase/firestore";

import { doc, getDoc } from "firebase/firestore";

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
      console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);
  // const citiesRef = collection(db, "cities");
  // setDoc(doc(citiesRef, "SF"), {
  //   name: "San Francisco",
  //   state: "CA",
  //   country: "USA",
  //   capital: false,
  //   population: 860000,
  //   regions: ["west_coast", "norcal"],
  // });

  // const docRef = doc(db, "cities", "SF");
  // const docSnap = getDoc(docRef);
  // console.log(docSnap);
  //Firestore의 모든 함수는 비동기 함수이므로 await&async 혹은 then을 적절히 사용하자.
  //get은 데이터가 없을 경우 null을 반환하며, 가져온 데이터는 아래와 같이 res.data()의 형식으로 뽑아 낼 수 있다.

  // const docRef = addDoc(collection(db, "cities"), {
  //   name: "Tokyo",
  //   country: "Japan",
  // });
  // console.log("Document written with ID: ", docRef.id);
  // const docRef = doc(db, "ex-data", "Yir2o5hTEytcQvKUWZ6Q");
  // const docSnap = getDoc(docRef);

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // doc.data() will be undefined in this case
  //   console.log("No such document!");
  // }
  // console.log(db);
  // const querySnapshot = getDocs(collection(db, "ex-data")).then((data) => {
  //   data.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data()}`);
  //   });
  // });
  // querySnapshot.forEach((doc) => {
  //   console.log(`${doc.id} => ${doc.data()}`);
  // });
  // }, []);
  return (
    <div className="App">
      <Headers darkmode={darkmode} setDarkmode={setDarkmode} />
      <Main darkmode={darkmode} setDarkmode={setDarkmode} />
    </div>
  );
}

export default App;
