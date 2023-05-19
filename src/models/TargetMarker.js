import * as THREE from 'three';

export function TargetMarker() {
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const geometry = new THREE.SphereGeometry(.1);
  const mesh = new THREE.Mesh( geometry, material );

  return {
    get mesh() { return mesh }
  }
}