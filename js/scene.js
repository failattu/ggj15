var bullets = [];
function initWorld() {
	var gameScene = new Scene();
	game.pushScene(gameScene);
	var p1 = new Player();
	var p2 = new Player();
  var p1_cannon = new Sprite(100,100);
	var p2_cannon = new Sprite(100,100);
	p1_cannon.image = game.assets['assets/cannon.png'];
	p2_cannon.image = game.assets['assets/cannon.png'];
	var bg = makeBackground(game.assets['assets/bground.png'])
	gameScene.addChild(bg);

  p1_cannon.x = 30;
  p1_cannon.y = 248;
	p2_cannon.x = 200;
	p2_cannon.y = 248;

	gameScene.addChild(p1_cannon);
	gameScene.addChild(p2_cannon);
  p1_cannon.addEventListener("enterframe", function(){
  if(p1.hp > 0){
		if (game.input.left && !game.input.right) {
			if (this.x != -50) this.x -= 1;
		}
    if (game.input.right && !game.input.left) {
			if(this.x < 274)this.x += 1;
		}
	}
	else{
		console.log("p1 has died"); game.stop();}
  });

	p2_cannon.addEventListener("enterframe", function(){
	if(p2.hp > 0)
	{
		if (game.input.lefta && !game.input.rightd) {
			if (this.x != -50) this.x -= 1;
		}
		if (game.input.rightd && !game.input.lefta) {
			if(this.x < 274)this.x += 1;
		}
	}
	else{
		game.stop();
		}
	});
	var ground = new Sprite(320, 32);
	ground.image = game.assets['assets/ground.png'];

	ground.x = 0;
	ground.y = 298;
	gameScene.addChild(ground);
	gameScene.addEventListener("enterframe", function() {
		if (game.input.up) {
			fire(p1, p1_cannon);
		}
		p1.fireCooldown -= 1;
		if(game.input.upw){
			fire(p2, p2_cannon);
		}
		p2.fireCooldown -=1;
		if(game.frame % 120 == 0) {
			addEnemy(ground,p1,p2);
		}
	});

}
function makeBackground(image) {
	var bg = new Sprite(1024, 768);
	bg.image = image;
	return bg;
}
