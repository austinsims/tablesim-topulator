define( ["three", "camera", "container"], function( THREE, camera, container ) {
    'use strict';
    var controls = new THREE.OrbitControls( camera, container );

    return controls;
} );
