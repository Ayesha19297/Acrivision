import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Pipe = ({ start, end, color = "gray", radius = 1 }) => {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);

  const direction = new THREE.Vector3().subVectors(endVec, startVec);
  const length = direction.length();

  const position = startVec.clone().addScaledVector(direction, 0.5);

  const orientation = new THREE.Quaternion();
  orientation.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.clone().normalize()
  );

  return (
    <mesh position={position} quaternion={orientation}>
      <cylinderGeometry args={[radius, radius, length, 32]} />{" "}
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Display = ({ data }) => {
  if (!data || !data.connections || !data.nodes) {
    return null;
  }

  const { connections, nodes } = data;

  const createPipes = () => {
    return connections.map((connection, index) => {
      const startNode = nodes[connection["Start Node"]];
      const endNode = nodes[connection["End Node"]];

      if (!startNode || !endNode) return null;

      return (
        <Pipe
          key={index}
          start={startNode}
          end={endNode}
          color="yellow"
          radius={1}
        />
      );
    });
  };

  return (
    <Canvas
      style={{ width: "100vw", height: "80vh" }}
      camera={{ position: [0, 50, 100], fov: 100 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {createPipes()}
      <OrbitControls />
    </Canvas>
  );
};

export default Display;
