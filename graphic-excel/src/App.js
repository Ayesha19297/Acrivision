import { useState } from "react";
import Retrieve from "./Components/Retrieve";
import Display from "./Components/Display";

function App() {
  const [excelData, setExcelData] = useState(null);

  return (
    <div className="App">
      <h1
        style={{ textAlign: "center", fontFamily: "cursive", color: "blue" }}
      >
        3D GRAPHICS
      </h1>
      <Retrieve onLoad={setExcelData} />
      {excelData && <Display data={excelData} />}
    </div>
  );
}

export default App;
