import { Object } from './Object';


export class Bullet extends Object {

  constructor(app, position){
    super({
      name: 'bullet',
    });


    this.app = app;

    this.object.beginFill(0x00E676);
    this.object.drawCircle(0, 0, 12);
    this.object.endFill();
    this.object.x = position.x;
    this.object.y = position.y - this.object.width;

    app.stage.addChild(this.object);

    this.move();
  }


  move(){
    this.app.ticker.add(delta => {

      if(this.object.y < -this.object.width) {
        this.app.stage.removeChild(this.object);
        return null;
      }


      let collisionObjects = this.checkCollision();
      collisionObjects.length > 0 && collisionObjects.forEach(obj=>{
        this.app.stage.removeChild(obj);
      });


      let newPosY = this.object.y - 5;
      super.updatePosition(null, newPosY);
    });
  }



  checkCollision(){
    let collisionObjects = [];


    for(let i = 0; i < this.app.stage.children.length; i++){

      if( this.app.stage.children[i].name !== 'asteroid' ) continue;

      let asteroid = this.app.stage.children[i];
      let { tx: asteroidX, ty: asteroidY } = asteroid.transform.worldTransform;

      if(
        ( this.object.x >= (asteroidX-asteroid.width/2) ) &&
        ( this.object.x <= (asteroidX+asteroid.width/2) ) &&
        ( this.object.y <= (asteroidY+asteroid.height/2) )
      ){
        collisionObjects.push(this.object);
        collisionObjects.push(asteroid);
        break;
      }
    }


    return collisionObjects;
  }


};
