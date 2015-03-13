// Start the app
require( ['detector', 'app', 'container', 'ui'], function ( Detector, app, container, ui ) {
  if ( ! Detector.webgl ) {
    Detector.addGetWebGLMessage();
    container.innerHTML = "";
  }

  // Initialize our app and start the animation loop (animate is expected to call itself)
  ui.init();
  ui.register();
  
  app.init();
  app.animate();

});
