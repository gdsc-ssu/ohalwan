import { useState } from "react";
import Headers from "./pages/Header";
import Main from "./pages/Main";

function App() {
  const [darkmode, setDarkmode] = useState(false);

  return (
    <div className="App">
      <Headers darkmode={darkmode} setDarkmode={setDarkmode} />
      <Main darkmode={darkmode} setDarkmode={setDarkmode} />
    </div>
  );
}

export default App;
