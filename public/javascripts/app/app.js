define(
    [
        // THREE
        "three",

        // Other libs
        "lodash",

        // App modules
        "camera",
        "controls",
        "light",
        "renderer",
        "scene",
        "objects",
        "container",
    ],
    function(
        THREE,
        _,
        camera,
        controls,
        light,
        renderer,
        scene,
        objects,
        container
    ) {
        "use strict";

        var app = {
            meshes: [],
            init: function() {

                scene.add(objects.board);
                scene.add(objects.card);

            },
            animate: function() {
                window.requestAnimationFrame(app.animate);
                controls.update();

                // Any constant animations go here

                renderer.render(scene, camera);
            }
        };



        return app;
    });
