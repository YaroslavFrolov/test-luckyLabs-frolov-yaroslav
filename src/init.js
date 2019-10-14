import * as PIXI from 'pixi.js';
import { Spaceship } from './Spaceship';
import { Asteroid } from './Asteroid';



export let init = function() {

  let app = new PIXI.Application({
    width: 1280,
    height: 720,
    transparent: true,
  });



  app.loader
    .add('spaceship', '/assets/spaceship.png')
    .add('asteroid', '/assets/asteroid.png')
    .load((loader, resources) => {

      new Spaceship(resources, app, {
        x: app.renderer.width / 2,
        y: app.renderer.height - 100,
      });


      for(let i = 1; i <= 5; i++){
        let asteroid = new Asteroid(resources, app, {
          x: i * 200,
          y: 0,
        });

        asteroid.move(i);
      }


      document.body.appendChild(app.view);
    });



};
