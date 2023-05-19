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
  
  const _gridMesh = new THREE.LineSegments( geometry, material );
  _gridMesh.rotateX(-Math.PI / 2);

  // Invisible raycast target
  const _parentMesh = new THREE.Mesh( new THREE.PlaneGeometry( lineWidth, lineSegments ));
  _parentMesh.material.transparent = true;
  _parentMesh.material.opacity = 0;
  _parentMesh.rotateX(-Math.PI / 2);
  _parentMesh.name = 'floor';
  _parentMesh.add(_gridMesh);
  
  return {
    get mesh() { return _parentMesh }
  }
}