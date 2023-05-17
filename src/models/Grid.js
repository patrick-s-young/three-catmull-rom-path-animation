import * as THREE from 'three';

export function Grid() {
  const material = new THREE.LineBasicMaterial({
    color: 0x00ff00
  });
  
  const lineWidth = 18;
  const lineSegments = 18;
  const lineSegmentsStartOffset = -lineSegments/2;
  const lineSegmentsEndOffset = -lineSegmentsStartOffset;
  const points = [];
  for (let offset = lineSegmentsStartOffset; offset <= lineSegmentsEndOffset; offset++) {
    points.push( new THREE.Vector3( -lineWidth/2, 0, offset ) );
    points.push( new THREE.Vector3( lineWidth/2, 0, offset ) );
    points.push( new THREE.Vector3( offset, 0, -lineWidth/2 ) );
    points.push( new THREE.Vector3( offset, 0, lineWidth/2 ) );
  }

  
  const geometry = new THREE.BufferGeometry().setFromPoints( points );
  
  const mesh = new THREE.LineSegments( geometry, material );
  
  return {
    get mesh() { return mesh }
  }
}