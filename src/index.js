import * as PIXI from 'pixi.js';
import { Spaceship_singleton } from './objects/Spaceship';
import { Asteroid } from './objects/Asteroid';
import { initTimer } from './game/initTimer';
import { checkIfWin } from './game/checkIfWin';



(function() {


  let app = new PIXI.Application({
    width: 1280,
    height: 720,
    transparent: true,
  });



  app.loader
    .add('spaceship', '/assets/spaceship.png')
    .add('asteroid', '/assets/asteroid.png')
    .load((loader, resources) => {

      for(let i = 1; i <= 5; i++){
        new Asteroid(resources, app, {
          idx: i,
        });
      }

      new Spaceship_singleton(resources, app);

      document.body.appendChild(app.view);



      initTimer(app);

      app.ticker.add(delta => {
        checkIfWin(app);
      });
    });



})();
