import * as PIXI from 'pixi.js';
import { Bullet } from './Bullet';



export class Spaceship {

  constructor(resources, app, position){
    this.app = app;
    this.spaceship = new PIXI.Sprite(resources.spaceship.texture);

    this.spaceship.x = position.x;
    this.spaceship.y = position.y;

    this.spaceship.anchor.x = 0.5;
    this.spaceship.anchor.y = 0.5;

    app.stage.addChild(this.spaceship);

    document.addEventListener('keydown', e => {
      this.move(e.keyCode);
      this.fire(e.keyCode);
    });
  }



  move(keyCode){
    const STEP = 25;

    //left
    if(keyCode === 37){
      let newPosition = this.spaceship.x - STEP;

      if( newPosition < (this.spaceship.width/4) ) return null;

      this.spaceship.x = newPosition;
    }

    //right
    if(keyCode === 39){
      let newPosition = this.spaceship.x + STEP;

      if(newPosition > (this.app.renderer.width - (this.spaceship.width/4)) ) return null;

      this.spaceship.x = newPosition;
    }

  }



  fire(keyCode){
    //space
    if(keyCode !== 32) return null;


    new Bullet(this.app, {
      x: this.spaceship.x,
      y: this.app.renderer.height - this.spaceship.height,
    });
  }

};
