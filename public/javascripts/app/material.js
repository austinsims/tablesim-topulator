define( ["three", "shader!simple.vert", "shader!simple.frag", "texture"], function ( THREE, simpleVert, simpleFrag, texture ) {
  // Shader objects support redefining of #defines.
  // See `simple.frag` file, where `faceColor` is already defined to be white, and we are overriding it to red here
  simpleFrag.define( "faceColor", "vec3(1.0, 0, 0)" );
  return {
    // materials from amd-three-js framework
    bump: new THREE.MeshPhongMaterial( { bumpMap: texture.grass } ),
    grass: new THREE.MeshBasicMaterial( { map: texture.grass } ),
    shader: new THREE.ShaderMaterial( {
      uniforms: {
        uColor: { type: "c", value: new THREE.Color( "#ff0000" ) }
      },
      vertexShader: simpleVert.value,
      fragmentShader: simpleFrag.value
    }),
    solid: new THREE.MeshLambertMaterial( {
      color: 0x00dcdc,
      shading: THREE.FlatShading
    }),
    wire: new THREE.MeshBasicMaterial( { wireframe: true } ),

    // custom materials
    board: new THREE.MeshLambertMaterial({
      map: texture.board
    }),

    card: new THREE.MeshPhongMaterial({
      shininess: 0,
      map: texture.card
    }),

    deck: new THREE.MeshPhongMaterial({
      shininess: 0,
      map: texture.deck
    })
  };
});
