import React, { useState, useEffect } from "react";
import * as THREE from "three";
import filePath from "./assets/truck.obj";
import filePathtwo from "./assets/cottage_obj.obj";
import { Canvas, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"; // Import the appropriate loader for your model forma

function ModelLoader() {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loader = new OBJLoader();
    // loader.load(
    //     // resource URL
    //     filePath,
    //     // called when resource is loaded
    //     function ( object ) {
    //         setModel(object.children[0])
    //         // scene.add( object );
    
    //     },
    //     // called when loading is in progresses
    //     function ( xhr ) {
    
    //         console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
    //     },
    //     // called when loading has errors
    //     function ( error ) {
    
    //         console.log( 'An error happened' );
    
    //     }
    // );
    loader.load(filePath, (obj) => setModel(obj.children[0]));
  }, []);

  if (!model) return null;
  return (
    <mesh>
      <primitive object={model} />
    </mesh>
  );
}
function Bard() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} />
      <ModelLoader />
    </Canvas>
  );
}

export default Bard;
