import * as THREE from 'three';

export const Arrow = () => {
  const mesh = new THREE.Group();

  const baseLength = 2;
  const tipLength = 3;
  const depth = 1;
  const shape = new THREE.Shape();
  shape.moveTo( 1, -1);
  shape.lineTo( 1, 1 );
  shape.lineTo( 2, 1 );
  shape.lineTo( 0, 5 );
  shape.lineTo( -2, 1 );
  shape.lineTo( -1, 1 );
  shape.lineTo( -1, -1 );
  shape.lineTo( 1, -1 );
  
  const extrudeSettings = {
    depth
  };
  
  const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  const material = new THREE.MeshBasicMaterial( { color: 0x0000ff, transparent: true, opacity: .8 } );
  const arrow = new THREE.Mesh( geometry, material );

  arrow.rotateX(-Math.PI/2);
  arrow.scale.setScalar(.1);
  mesh.add(arrow);

  return {
    get mesh() { return mesh }
  }

}