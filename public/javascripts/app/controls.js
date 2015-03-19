define(["three", "lodash", "camera", "container", "renderer", "objects", "moveables"], function(THREE, _, camera, container, renderer, objects, moveables) {
    'use strict';

    var PICK_UP_LENGTH = 3;

    var controls = new THREE.OrbitControls(camera, container);

    // Utility functions

    // Convert a mouse coordiate on the canvas to a 3d position in the XZ plane.
    var getMouse3d = function(mouseEvent) {

        // Try both props for browser compatibility
        var x = mouseEvent.offsetX || mouseEvent.layerX;
        var y = mouseEvent.offsetY || mouseEvent.layerY;

        var pos = new THREE.Vector3(0, 0, 0);
        var pMouse = new THREE.Vector3(
            (x / renderer.domElement.width) * 2 - 1, -(y / renderer.domElement.height) * 2 + 1,
            1
        );

        pMouse.unproject(camera);

        var cam = camera.position;
        var m = pMouse.y / (pMouse.y - cam.y);

        pos.x = pMouse.x + (cam.x - pMouse.x) * m;
        pos.z = pMouse.z + (cam.z - pMouse.z) * m;

        return pos;
    };


    // Does the given position lie within the bounding box of the given object
    // in the XZ plane?
    var isPosOnObject = function(options) {
    	var pos = options.pos;
    	var object = options.object;

    	var boundingBox = new THREE.Box3().setFromObject(options.object);
        var min = boundingBox.min;
        var max = boundingBox.max;

        return pos.x >= min.x && pos.x <= max.x && pos.z >= min.z && pos.z <= max.z;

    };


    // Set up event listeners

    var pickedUpMoveable = null;

    window.addEventListener('mousedown', function(event) {
        var mouse3d = getMouse3d(event);

        // Disable LMB to rotate if mouse click was on the board.
        controls.noRotate = isPosOnObject({pos: mouse3d, object: objects.board});

        // Look for an object to pick up. (for now the only object to check is one card)
        // TODO: Move "moveableObjects" to objects.js, somewhere else in this file, or its own
        var moveableObjects = [moveables.card];
        pickedUpMoveable = _.find(moveableObjects, function(moveable) {
        	return isPosOnObject({pos: mouse3d, object: moveable.object});
        });

        if (pickedUpMoveable) {
            var currentY = pickedUpMoveable.object.position.y;
        	pickedUpMoveable.move({y: currentY + PICK_UP_LENGTH});

        	// Start dragging.
        	window.addEventListener('mousemove', onMouseMove);

        }

    });


    var onMouseMove = function(event) {
    	var mouse3d = getMouse3d(event);

    	// drag picked up object, if any
    	if (pickedUpMoveable) {
            pickedUpMoveable.move({x: mouse3d.x, z: mouse3d.z});
    	}
    };


    window.addEventListener('mouseup', function(event) {
        controls.noRotate = false;

        // drop picked up object, if any
        if (pickedUpMoveable) {
            var currentY = pickedUpMoveable.object.position.y;
	        pickedUpMoveable.move({y: currentY - PICK_UP_LENGTH});
	        pickedUpMoveable = null;
	        // Stop dragging.
	        window.removeEventListener('mousemove', onMouseMove);
	    }
    });

    // Observe card position and tell server about it.


    return controls;
});