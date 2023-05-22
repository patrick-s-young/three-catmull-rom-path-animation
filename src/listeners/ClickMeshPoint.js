// Three
import * as THREE from 'three';


//////////
// BEGIN
export const ClickToMeshPoint = ({
  mesh,
  scene,
  camera,
  onClickMeshCallback
}) => {
  const _raycaster = new THREE.Raycaster();
	const _pointer = new THREE.Vector2();
  let _isEnabled;
  let _intersected;
  setEnabled(true);

  function setEnabled (isEnabled) {
    _isEnabled = isEnabled;
    if (_isEnabled === true) {
      window.addEventListener('click', getTarget, { capture: true });
    } else {
      window.removeEventListener('click', getTarget, { capture: true });
    }
  }


  function getTarget (event) {
    event.preventDefault();
    // calculate pointer position in normalized device coordinates
	  // (-1 to +1) for both components
    _pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    _pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // update the picking ray with the camera and pointer position
	  _raycaster.setFromCamera( _pointer, camera );
    // calculate objects intersecting the picking ray
	  const _intersects = _raycaster.intersectObjects( scene.children, false );
    // reset _intersected flag
    _intersected = null;
    if (_intersects.length === 0) return;
    for ( let i = 0; i < _intersects.length; i ++ ) {
      if (_intersects[i].object.name === mesh.name) {
        _intersected = _intersects[i];
        break;
      }
    }
    if (_intersected !== null) {
      onClickMeshCallback(_intersected.point);
    }
  }

  return {
    setEnabled
  }
}