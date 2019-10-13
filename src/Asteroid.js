import * as PIXI from 'pixi.js';


export class Asteroid {

  constructor(resources, app, position){
    this.asteroid = new PIXI.Sprite(resources.asteroid.texture);

    this.asteroid.x = position.x;
    this.asteroid.y = position.y;
    this.asteroid.name = 'asteroid';


    app.stage.addChild(this.asteroid);
  }


  update(delta){

  }

};
