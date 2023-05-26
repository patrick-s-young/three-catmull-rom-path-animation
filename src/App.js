// Three
import * as THREE from 'three';
// Scene, Camera, Lights
import { Scene } from './scene/Scene';
import { Camera } from './cameras/Camera';
import { Lights } from './lights/Lights';
// Models
import { AnimatedModel } from './models/AnimatedModel';
import { Grid } from './models/Grid';
import { TargetMarker } from './models/TargetMarker';
// Animation
import { PathToTarget } from './animation/PathToTarget';
// Renderer
import { Renderer } from './renderer/Renderer';
// Character & Animation configs
import { CONFIGS } from './configs/configs';
// Helpers
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// Styles
import './style.css';


//////////////////
// BEGIN COMPONENT
export const App = () => {
  // SCENE SETUP
  const scene = Scene();
  const camera = Camera();
  const lights = Lights();
  scene.add(lights.getLights());
  // MODALS
  //const cat = AnimatedModel(CONFIGS.CHARACTER, CONFIGS.ANIMATION, onAnimatedModelInit);
  //scene.add(cat.mesh);
  const floor = Grid();
  scene.add(floor.mesh);
  const centerPoint = TargetMarker({ color: '#ff0000' });
  centerPoint.mesh.position.set(0, 0, 0);
  scene.add(centerPoint.mesh);
  // PATH TO TARGET
  const pathToTarget = PathToTarget({
    meshToIntersect: floor.mesh,
    meshToMove: centerPoint.mesh,
    scene: scene.self,
    camera: camera.self
  });
  // RENDERER
  const renderer = Renderer();
  document.body.appendChild(renderer.domElement);
  const clock = new THREE.Clock();
  // ORBIT CONTROLS
  const controls = new OrbitControls(camera.self, renderer.domElement)
  controls.target.set(0, 0, 0);
  controls.update();




  //function onAnimatedModelInit() {
    renderer.setAnimationLoop(animationLoopCallback);
  //}

  // RENDER LOOP
  function animationLoopCallback(timestamp) {
    const dt = clock.getDelta();
    //cat.update(dt);
    renderer.render(scene.self, camera.self);
  }

  return null;
}


