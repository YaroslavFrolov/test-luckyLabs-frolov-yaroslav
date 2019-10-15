import * as PIXI from 'pixi.js';
import { Bullet } from './Bullet';
import { Object } from './Object';
import { gameOver } from '../game/gameOver';


export class Spaceship_singleton extends Object {

  constructor(resources, app){
    super({
      app,
      name: 'spaceship',
      texture: resources.spaceship.texture,
    });

    this.app = app;
    this.countBullets = 10;

    this.object.x = app.renderer.width / 2;
    this.object.y = app.renderer.height - this.object.height/2;


    this.renderCountBullets();
    this.checkCollision();


    document.addEventListener('keydown', e => {
      this.move(e.keyCode);
      this.fire(e.keyCode);
    });
  }



  move(keyCode){
    const STEP = 25;

    //left
    if(keyCode === 37){
      let newPosition = this.object.x - STEP;

      if( newPosition < (this.object.width/2) ) return null;

      super.updatePosition(newPosition);
    }

    //right
    if(keyCode === 39){
      let newPosition = this.object.x + STEP;

      if(newPosition > (this.app.renderer.width - (this.object.width/2)) ) return null;

      super.updatePosition(newPosition);
    }
  }



  fire(keyCode){
    //space
    if(keyCode !== 32) return null;

    if(this.countBullets < 1) {
      gameOver('YOU LOSE', this.app);
      return null;
    }


    new Bullet(this.app, {
      x: this.object.x,
      y: this.app.renderer.height - this.object.height,
    });

    this.countBullets--;
    this.renderCountBullets();
  }



  renderCountBullets(){
    this.app.stage.removeChild(this.countBulletsTxt);

    this.countBulletsTxt = new PIXI.Text(`bullets: ${this.countBullets} / 10`, {
      fontFamily: 'Concert One',
      fontSize: 24,
      fill : 0xff005b,
    });

    this.app.stage.addChild(this.countBulletsTxt);
  }



  checkCollision(){
    let asteroids = this.app.stage.children.filter(child=>child.name === 'asteroid');


    this.app.ticker.add(delta => {
      let isExistCollision = asteroids.some(asteroid=>{
        let { tx: asteroidX, ty: asteroidY } = asteroid.transform.worldTransform;

        if(
          ( this.object.x >= (asteroidX-asteroid.width/2) ) &&
          ( this.object.x <= (asteroidX+asteroid.width/2) ) &&
          ( this.object.y-(this.object.height/2) <= (asteroidY+asteroid.height/2) )
        ){
          return true;
        }
      });

      isExistCollision && gameOver('YOU LOSE', this.app);
    });
  }

};
