import * as THREE from 'three';

export function Lights() {
  //const hemisphere = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 2);
 // hemisphere.position.set( 0.5, 1, 0.25 );
  //const directional = new THREE.DirectionalLight();
  //directional.position.set( 0.2, 1, 1);
  const point = new THREE.PointLight(0xffffff);
  point.position.set(0, 10, 0);
  point.castShadow = true;
  point.shadow.mapSize.width = 2048;
  point.shadow.mapSize.height = 2048;
  
  return {
    getLights: () => [point]
  }
}