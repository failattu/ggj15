var bullets = [];
function initWorld() {
	var gameScene = new Scene();
	game.pushScene(gameScene);
	var p1 = new Player();
	var p2 = new Player();
  	var p1_cannon = new Sprite(cannon_x,cannon_y);
	var p2_cannon = new Sprite(cannon_x,cannon_y);
	p1_cannon.image = game.assets['assets/cannon.png'];
	p2_cannon.image = game.assets['assets/cannon.png'];
	var bg = makeBackground(game.assets['assets/bground.png'])
	gameScene.addChild(bg);

	p1_cannon.x = game_x * 0.25;
	p1_cannon.y = game_y - ground_y*2;
	p2_cannon.x = game_x * 0.75;
	p2_cannon.y = game_y - ground_y*2;

	gameScene.addChild(p1_cannon);
	gameScene.addChild(p2_cannon);
  	p1_cannon.addEventListener("enterframe", function(){
    	if(p1.hp > 0){
			if (game.input.left && !game.input.right) {
				if (this.x >= 0) this.x -= 3;
			}
    		if (game.input.right && !game.input.left) {
				if(this.x <= game_x * 0.5 - cannon_x) this.x += 3;
			}
		}
		else {
			console.log("p1 has died"); game.stop();
		}
  	});

	p2_cannon.addEventListener("enterframe", function(){
	if(p2.hp > 0)
	{
		if (game.input.lefta && !game.input.rightd) {
			if (this.x >= game_x * 0.5) this.x -= 3;
		}
		if (game.input.rightd && !game.input.lefta) {
			if(this.x <= game_x - cannon_x)this.x += 3;
		}
	}
	else{
		game.stop();
		}
	});
	var ground = new Sprite(game_x, ground_y);
	ground.image = game.assets['assets/ground.png'];

	ground.x = 0;
	ground.y = game_y - ground_y;
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
var label2 = new Label();
label2.width = 256;
label2.height = 64;
label2.font = "12px 'Arial'";
label2.color = 'rgb(0, 0, 0)';
label2.y = 40;
label2.x = 50;
label2.addEventListener('enterframe', function(){
	this.text = "Player 1 HP " + p1.hp;
});
gameScene.addChild(label2);
}
function makeBackground(image) {
	var bg = new Sprite(game_x, game_y);
	bg.image = image;
	return bg;
}
