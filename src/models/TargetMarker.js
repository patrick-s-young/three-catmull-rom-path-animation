import * as THREE from 'three';

export function TargetMarker({ color, position }) {
  const material = new THREE.MeshBasicMaterial({ color });
  const geometry = new THREE.SphereGeometry(.1);
  const mesh = new THREE.Mesh( geometry, material );
  mesh.position.set(...position);
  return mesh;
}