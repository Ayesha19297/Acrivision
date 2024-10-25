import { useState } from "react";
import Retrieve from "./Components/Retrieve";
import Display from "./Components/Display";

function App() {
  const [excelData, setExcelData] = useState(null);

  return (
    <div className="App">
      <h1>3D graphics</h1>
      <Retrieve onLoad={setExcelData} />
      {excelData && <Display data={excelData} />}
    </div>
  );
}

export default App;
