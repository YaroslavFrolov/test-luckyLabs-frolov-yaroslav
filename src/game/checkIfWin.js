import { gameOver } from './gameOver';


export let checkIfWin = app => {
  let asteroids = app.stage.children.filter(child=>child.name === 'asteroid');

  if(asteroids.length < 1){
    gameOver('YOU WIN', app);
  }
};
