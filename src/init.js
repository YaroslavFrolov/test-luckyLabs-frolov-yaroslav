import * as PIXI from 'pixi.js';



export let init = function() {

  let app = new PIXI.Application({
    width: 1280,
    height: 720,
    transparent: true,
  });

  document.body.appendChild(app.view);

};
