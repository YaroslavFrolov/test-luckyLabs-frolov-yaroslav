import * as PIXI from 'pixi.js';


export let gameOver = (message, app) => {

  let blackRect = new PIXI.Graphics();
  blackRect.beginFill(0x000000);
  blackRect.drawRect(0, 0, app.renderer.width, app.renderer.height);
  blackRect.endFill();

  const FONT_SIZE = 48;

  let messageTxt = new PIXI.Text(message, {
    fontSize: FONT_SIZE,
    fill : 0xff1010,
  });

  messageTxt.x = app.renderer.width / 2 - messageTxt.width / 2;
  messageTxt.y = app.renderer.height / 2 - FONT_SIZE;

  app.stage.addChild(blackRect);
  app.stage.addChild(messageTxt);
};
