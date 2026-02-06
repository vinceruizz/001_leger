import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/3d-Hologramm.gltf");
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

export default function App() {
  return (
    <Canvas
      style={{ width: "100vw", height: "100vh" }}
      camera={{ position: [0, 1.5, 4], fov: 50 }}
    >
      <color attach="background" args={["#111"]} />

      {/* lights */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      <Suspense fallback={null}>
        <Model />
      </Suspense>

      <OrbitControls />
    </Canvas>
  );
}
