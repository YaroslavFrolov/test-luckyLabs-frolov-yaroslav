import { Object } from './Object';


export class Bullet extends Object {

  constructor(app, position){
    super({
      app,
      name: 'bullet',
    });

    this.object.beginFill(0x00E676);
    this.object.drawCircle(0, 0, 12);
    this.object.endFill();
    this.object.x = position.x;
    this.object.y = position.y - this.object.width;

    this.move();
  }


  move(){
    this.app.ticker.add(delta => {

      if(this.object.y < -this.object.width) {
        this.app.stage.removeChild(this.object);
        return null;
      }


      this.checkCollision();


      let newPosY = this.object.y - 5;
      super.updatePosition(null, newPosY);
    });
  }



  checkCollision(){
    let asteroids = this.app.stage.children.filter(child=>child.name === 'asteroid');
    let bullet = this.object;

    let collisionAsteroid = asteroids.find(asteroid=>{
      let { tx: asteroidX, ty: asteroidY } = asteroid.transform.worldTransform;

      if(
        ( bullet.x >= (asteroidX-asteroid.width/2) ) &&
        ( bullet.x <= (asteroidX+asteroid.width/2) ) &&
        ( bullet.y-(bullet.height/2) <= (asteroidY+asteroid.height/2) )
      ){
        return true;
      }
    });


    if(collisionAsteroid){
      this.app.stage.removeChild(collisionAsteroid);
      this.app.stage.removeChild(bullet);
    }
  }


};
