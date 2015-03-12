define(["three", "geometry", "material"], function(THREE, geometry, material) {
    "use strict";

    // Move the specified Object3D so that it is centered on the origin
    // with respect to  x  and  z.  y is not modified.
    var centerOnOrigin = function(object3d) {
        var boundingBox = new THREE.Box3().setFromObject(object3d);
        var center = boundingBox.center();
        object3d.position.x = -center.x;
        object3d.position.z = -center.z;
    };

    var objects = {};

    objects.board = new THREE.Mesh(geometry.board, material.board);
    centerOnOrigin(objects.board);

    objects.card = new THREE.Mesh(geometry.card, material.card);

    return objects;
});