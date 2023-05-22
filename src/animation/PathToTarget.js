// Three
import * as THREE from 'three';
// listeners
import { ClickToMeshPoint } from '../listeners/ClickMeshPoint';
// models
import { TargetMarker } from '../models/TargetMarker';


//////////
// BEGIN
export const PathToTarget = ({
  meshToIntersect,
  meshToMove,
  scene,
  camera
}) => {
  let pathMarkers = [];
  const clickToMeshPoint = ClickToMeshPoint({
    mesh: meshToIntersect,
    scene,
    camera,
    onClickMeshCallback: plotPath
  });


  function plotPath(P2) {
    
    const P0 = meshToMove.position;
    const rise = P2.z - P0.z;
    const run = P2.x - P0.x;


    const angleBetween = Math.abs(Math.atan(rise/run));
    const perp = Math.abs(angleBetween + Math.PI/2);
    const length = Math.sqrt(Math.pow(rise, 2) + Math.pow(run,2)) / 3;
    const P0_P2_midpoint = {
      x: (P0.x + P2.x) / 2,
      y: 0,
      z: (P0.z + P2.z) / 2
    }
    const moveXDirection = P0.x >= P2.x ? 1 : -1;
    const moveYDirection = P0.z >= P2.z ? 1 : -1;

    console.log('angleBetween:', angleBetween * 180/Math.PI)
    console.log('perp', perp * 180/Math.PI)
    const P1 = new THREE.Vector3(
      P0_P2_midpoint.x  + Math.cos(perp) * length * moveXDirection, 
      0, 
      P0_P2_midpoint.z + Math.sin(perp) * length * moveYDirection
      );
    

    // const pathPoints = [
    //   { color: '#ff0000', position: P0 }, 
    // {color: '#0000ff', position: P1}, 
    // {color: '#00ff00', position: P2}];
// console.log('pathMarkers', pathMarkers)
    pathMarkers.forEach(item => item.removeFromParent());
    // get curve points
    // pathPoints.forEach(item => {
    //   const pathMarker = TargetMarker(item);
    //   pathMarkers.push(pathMarker);
    //   scene.add(pathMarker);
    // });

    const curve = new THREE.CatmullRomCurve3( [P0, P1, P2] );
    for (let idx = 0; idx <= 1; idx += .1) {
      const position = curve.getPoint(idx);
      const pathMarker = TargetMarker({ color: '#ff00ff', position });
      pathMarkers.push(pathMarker);
      scene.add(pathMarker)
    }
  }

  return {
    setEnabled: clickToMeshPoint.setEnabled
  }
}