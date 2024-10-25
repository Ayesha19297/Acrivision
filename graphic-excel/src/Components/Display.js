import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";

const Display = ({ data }) => {
  if (!data || !data.connections || !data.nodes) {
    return null;
  }

  const { connections, nodes } = data;

  const createLines = () => {
    return connections.map((connection, index) => {
      const startNode = nodes[connection["Start Node"]]; 
      const endNode = nodes[connection["End Node"]];

      if (!startNode || !endNode)
        return null; 

      return (
        <Line
          key={index}
          points={[startNode, endNode]}
          color="red"
          lineWidth={2}
        />
      );
    });
  };

  return (
    <Canvas camera={{ position: [0, 50, 100], fov: 45 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {createLines()}
      <OrbitControls />
    </Canvas>
  );
};

export default Display;