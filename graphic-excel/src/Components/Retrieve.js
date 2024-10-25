import { useEffect } from "react";
import * as XLSX from "xlsx";

const Retrieve = ({ onLoad }) => {
  useEffect(() => {
    fetch(`/sample.xlsx`)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const binaryStr = new Uint8Array(data).reduce(
          (acc, byte) => acc + String.fromCharCode(byte),
          ""
        );

        const workbook = XLSX.read(binaryStr, { type: "binary" });
        //console.log("Workbook:", workbook);

        //const sheetNames = workbook.SheetNames;
        //console.log("Sheet Names:", sheetNames);

        const sheetA = XLSX.utils.sheet_to_json(workbook.Sheets["A"]);
        const sheetB = XLSX.utils.sheet_to_json(workbook.Sheets["B"]);

        console.log("Sheet A:", sheetA);
        console.log("Sheet B:", sheetB);

        const mergedData = {
          connections: sheetA,
          nodes: sheetB.reduce((acc, node) => {
            acc[node.Node] = [node.X, node.Y, node.Z];
            return acc;
          }, {}),
        };

        //console.log("Combined Data:", mergedData);
        onLoad(mergedData);
      })
      .catch((error) => console.error("Error reading excel file:", error));
  }, [onLoad]);
};

export default Retrieve;
