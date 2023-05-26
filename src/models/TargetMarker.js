import * as THREE from 'three';

export const TargetMarker = ({ color }) => {
  const material = new THREE.MeshBasicMaterial({ color });
  const geometry = new THREE.SphereGeometry(.1);
  const mesh = new THREE.Mesh( geometry, material );
  return {
    get mesh() { return mesh }
  }
}