import { noise } from '../utils/perlinNoise';
import { getRandomIntInclusive } from '../utils/helpers';
import { Object } from './Object';


export class Asteroid extends Object{

  constructor(resources, app, settings){
    super({
      name: 'asteroid',
      texture: resources.asteroid.texture,
    });

    this.app = app;

    this.object.x = settings.idx * 200;
    this.object.y = getRandomIntInclusive(-50, 100);
    this.object.anchor.x = 0.5;
    this.object.anchor.y = 0.5;

    app.stage.addChild(this.object);

    this.move(settings.idx);
  }


  move(idx){
    this.app.ticker.add(delta => {

      //===== CALCULATE DIRECTION Y
      let newPosY = this.object.y + .2;


      //===== CALCULATE DIRECTION X
      let currentTime_ms = this.app.ticker.lastTime;

      let noiseValue = noise(currentTime_ms/10000, idx, 0);
      noiseValue = noiseValue <= .5 ? -noiseValue : noiseValue;

      let newPosX = this.object.x + noiseValue/5;
      newPosX = newPosX < 0 ? 0 : newPosX;
      newPosX = newPosX > this.app.renderer.width ? this.app.renderer.width : newPosX;


      //===== CALCULATE ROTATION
      let direction = idx % 2 === 0 ? -1 : 1;
      this.object.rotation = this.object.rotation + direction * noiseValue/100;


      super.updatePosition(newPosX, newPosY);
    });
  }

};
