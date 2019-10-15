import * as PIXI from 'pixi.js';



export class Object {

  constructor(settings){
    this.object = settings.texture ? new PIXI.Sprite(settings.texture) : new PIXI.Graphics;
    this.object[settings.texture ? 'anchor' : 'pivot'].x = 0.5;
    this.object[settings.texture ? 'anchor' : 'pivot'].y = 0.5;

    this.object.name = settings.name;
    this.object.x = settings.x;
    this.object.y = settings.y;

    this.app = settings.app;
    this.app.stage.addChild(this.object);
  }


  updatePosition(newX, newY){
    this.object.x = newX ? newX : this.object.x;
    this.object.y = newY ? newY : this.object.y;
  }
};
