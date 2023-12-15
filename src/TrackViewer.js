import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"; // Import the appropriate loader for your model format
import obj from "./truck.3mf";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader"; 
import filePath from "./assets/truck.obj";
import material from "./assets/material.lib";
const TrackViewer = () => {
  const threeRootElement = useRef(null);

  useEffect(() => {
    let scene, camera, renderer;

    const init = () => {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xa0a0a0);
      scene.fog = new THREE.Fog(0xa0a0a0, 10, 500);

      camera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        1,
        500
      );
      camera.position.set(-50, 40, 50);
      scene.add(camera);

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
      hemiLight.position.set(0, 100, 0);
      scene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 3);
      dirLight.position.set(-0, 40, 50);
      dirLight.castShadow = true;
      dirLight.shadow.camera.top = 50;
      dirLight.shadow.camera.bottom = -25;
      dirLight.shadow.camera.left = -25;
      dirLight.shadow.camera.right = 25;
      dirLight.shadow.camera.near = 0.1;
      dirLight.shadow.camera.far = 200;
      dirLight.shadow.mapSize.set(1024, 1024);
      scene.add(dirLight);
      const loader = new OBJLoader(); // Use OBJLoader for OBJ files
      //   loader.load(
      //     'truck.3mf', // Replace with the path to your OBJ model
      //     (object) => {
      //       scene.add(object);
      //     },
      //     undefined,
      //     (error) => {
      //       console.error('Error loading track:', error);
      //     }
      //   );
      const mtlLoader = new MTLLoader();
      mtlLoader.load(material, function (materials) {
        materials.preload();
        loader.load(
          // resource URL
          filePath,
          // called when resource is loaded
          function (object) {
            scene.add(object.children[0]);
            // scene.add( object );
          },
          // called when loading is in progresses
          function (xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          },
          // called when loading has errors
          function (error) {
            console.log("An error happened");
          }
        );
      });
      // Load the track model
      //   const loader = new OBJLoader(); // Change this based on the format of your track model
      //   loader.load(
      //     obj, // Replace with the path to your track model
      //     (object) => {
      //       scene.add(object);
      //     },
      //     undefined,
      //     (error) => {
      //       console.error("Error loading track:", error);
      //     }
      //   );

      // Set up renderer, controls, window resize event
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.addEventListener("change", render);
      controls.minDistance = 50;
      controls.maxDistance = 200;
      controls.enablePan = false;
      controls.target.set(0, 20, 0);
      controls.update();

      window.addEventListener("resize", onWindowResize);

      render();
      threeRootElement.current.appendChild(renderer.domElement);
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

      render();
    };

    const render = () => {
      renderer.render(scene, camera);
    };

    init();
  }, []);

  return <div ref={threeRootElement} />;
};

export default TrackViewer;
