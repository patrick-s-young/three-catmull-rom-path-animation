// Three
import * as THREE from 'three';
// listeners
import { ClickToMeshPoint } from '../listeners/ClickMeshPoint';
// models
import { TargetMarker } from '../models/TargetMarker';
import { Arrow } from '../models/Arrow';

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


  const anchorPoint = (_P0, _P2) => {
    const rise = _P2.z - _P0.z;
    const run = _P2.x - _P0.x;
    const angleBetween = Math.abs(Math.atan(rise/run));
    const perp = Math.abs(angleBetween + Math.PI/2);
    const length = Math.sqrt(Math.pow(rise, 2) + Math.pow(run,2)) / 3;
    const P0_P2_midpoint = {
      x: (_P0.x + _P2.x) / 2,
      y: 0,
      z: (_P0.z + _P2.z) / 2
    }
     const moveXDirection = _P0.x < _P2.x ? 1 : -1;
     const moveYDirection = _P0.z < _P2.z ? 1 : -1;
    return new THREE.Vector3(
      P0_P2_midpoint.x  + Math.cos(perp) * length * moveXDirection, 
      0, 
      P0_P2_midpoint.z + Math.sin(perp) * length * moveYDirection
      );
  }


  function plotPath(P2) {
    const P0 = meshToMove.position;
    const P1 = anchorPoint(P0, P2);
    // Clear previous markers
    pathMarkers.forEach(item => item.removeFromParent());
    // Display P1 anchor position
    const marker = new THREE.Group();
    const P1_marker = TargetMarker({ color: '#ffffff' });
    marker.add(P1_marker.mesh)
    marker.position.set(P1.x, P1.y, P1.z);
    scene.add(marker)
    pathMarkers.push(marker);

    for (let idx = 0; idx <= 1; idx += .2) {
      const { position } = getBezierPoint(P0, P1, P2, idx);
      const { yRotation } = getBezierSlope(P0, P1, P2, idx);
      const marker = new THREE.Group();
      const ball = TargetMarker({ color: '#ff00ff' });
      const arrow = Arrow();
      marker.add(ball.mesh);
      marker.add(arrow.mesh);
      marker.position.set(position.x, 0, position.z);

      marker.rotateY(Math.abs(yRotation));
      console.log('marker.rotation.y', marker.rotation.y * 180/Math.PI)
      scene.add(marker);
      pathMarkers.push(marker);
    }
  }


  function getBezierPoint (P0, P1, P2, t) {
    const _P0 = P0.clone();
    const _P1 = P1.clone();
    const _P2 = P2.clone();
    const result = new THREE.Vector3(0, 0, 0);
    const tt = t * t;
    const tFromOne = 1 - t;
    _P0.multiplyScalar(tFromOne * tFromOne);
    _P1.multiplyScalar(2 * t * tFromOne);
    _P2.multiplyScalar(tt);
    result.addVectors(_P0, _P1);
    result.add(_P2);
    return { position: result };
  }

  function getBezierSlope (P0, P1, P2, t) {
    const _P0 = P0.clone();
    const _P1 = P1.clone();
    const _P2 = P2.clone();
    const result = new THREE.Vector3(0, 0, 0);
    _P0.multiplyScalar(-2 + 2 * t);
    _P1.multiplyScalar(2 - 4 * t);
    _P2.multiplyScalar( 2 * t);
    result.addVectors(_P0, _P1);
    result.add(_P2);
    console.log(`result.z: ${result.z} result.x: ${result.x}`)
    return { yRotation: Math.atan(result.z/result.x) - Math.PI/2 };
  }

  return {
    setEnabled: clickToMeshPoint.setEnabled
  }
}