import { Graphics } from 'pixi.js';



export class Bullet {

  constructor(app, position){
    this.app = app;

    this.bullet = new Graphics();
    this.bullet.beginFill(0x008000);
    this.bullet.drawCircle(0, 0, 12);
    this.bullet.endFill();
    this.bullet.x = position.x;
    this.bullet.y = position.y - this.bullet.width;

    app.stage.addChild(this.bullet);

    this.move();
  }


  move(){
    this.app.ticker.add(delta => {

      if(this.bullet.y < -this.bullet.width) {
        this.app.stage.removeChild(this.bullet);
        return null;
      }


      let collisionObjects = this.checkCollision();
      collisionObjects.forEach(obj=>{
        this.app.stage.removeChild(obj);
      });


      this.bullet.y -= 5;
    });
  }



  checkCollision(){
    let collisionObjects = [];


    for(let i = 0; i < this.app.stage.children.length; i++){

      if( this.app.stage.children[i].name !== 'asteroid' ) continue;

      let asteroid = this.app.stage.children[i];
      let { tx, ty } = asteroid.transform.worldTransform;

      if( (this.bullet.x >= tx) && (this.bullet.x <= (tx+150)) && (this.bullet.y <= (ty+143)) ){
        collisionObjects.push(this.bullet);
        collisionObjects.push(asteroid);
        break;
      }
    }


    return collisionObjects;
  }


};
