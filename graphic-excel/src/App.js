import { useState } from "react";
import Retrieve from "./Components/Retrieve";

function App() {
  const [excelData, setExcelData] = useState(null);

  return (
    <div className="App">
      <h1>3D graphics</h1>
      <Retrieve onLoad={setExcelData} />
    </div>
  );
}

export default App;
