import * as PIXI from 'pixi.js';
import { noise } from './perlinNoise';
import { getRandomIntInclusive } from './helpers';


export class Asteroid {

  constructor(resources, app, startPosition){
    this.app = app;

    this.asteroid = new PIXI.Sprite(resources.asteroid.texture);
    this.asteroid.x = startPosition.x;
    this.asteroid.y = startPosition.y + getRandomIntInclusive(-50, 100);
    this.asteroid.anchor.x = 0.5;
    this.asteroid.anchor.y = 0.5;
    this.asteroid.name = 'asteroid';

    app.stage.addChild(this.asteroid);


  }


  move(idx){
    this.app.ticker.add(delta => {

      let time = this.app.ticker.lastTime;

      this.asteroid.y += .2;




      let noiseValue = noise(time/10000, idx, 0);
      noiseValue = noiseValue <= .5 ? -noiseValue : noiseValue;

      let newPosX = this.asteroid.x + noiseValue/5;
      newPosX = newPosX < 0 ? 0 : newPosX;
      newPosX = newPosX > this.app.renderer.width ? this.app.renderer.width : newPosX;
      this.asteroid.x = newPosX;



      let direction = idx % 2 === 0 ? -1 : 1;
      this.asteroid.rotation = this.asteroid.rotation + direction * noiseValue/100;

    });
  }

};
