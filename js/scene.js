function rand(num) {
	return Math.floor(Math.random() * num);
}
function destroy (node) {
	node.removeEventListener('enterframe');
	game.currentScene.removeChild(node);
}

var bullets = [];
var ufoActive = false;
ufoSpawnTime = 60 * (rand(20) + 10);

function initWorld() {
	var gameScene = new Scene();
	game.pushScene(gameScene);
	var p1 = new Player();
	var p2 = new Player();
	var firstrun = false;
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
    	if(p1.resources > 0){
			if (game.input.lefta && !game.input.rightd) {
				if (this.x >= 0) this.x -= 5;
			}
    		if (game.input.rightd && !game.input.lefta) {
				if(this.x <= game_x * 0.5 - cannon_x) this.x += 5;
			}
		}
		else {
			console.log("p1 has died");
			var label2 = new Label();
			label2.width = p2textwidthw;
			label2.height = p2textheightw;
			label2.font = "24px 'Arial'";
			label2.color = 'rgb(0, 0, 0)';
			label2.y = p2locatioyw;
			label2.x = p2locatioxw;
			label2.addEventListener('enterframe', function(){
				this.text = "Player 2 has won the game";
			});
			gameScene.addChild(label2);
			if(firstrun== true) game.stop();
			firstrun =true;
		}
  	});

	p2_cannon.addEventListener("enterframe", function(){
	if(p2.resources > 0)
	{
		if (game.input.left && !game.input.right) {
			if (this.x >= game_x * 0.5) this.x -= 5;
		}
		if (game.input.right && !game.input.left) {
			if(this.x <= game_x - cannon_x)this.x += 5;
		}
	}
	else{
		var label2 = new Label();
		label2.width = p1textwidthw;
		label2.height = p1textheightw;
		label2.font = "24px 'Arial'";
		label2.color = 'rgb(0, 0, 0)';
		label2.y = p1locatioyw;
		label2.x = p1locatioxw;
		label2.addEventListener('enterframe', function(){
			this.text = "Player 1 has won the game ";
		});
		gameScene.addChild(label2);

		if(firstrun== true) game.stop();
		firstrun =true;
		}
	});
	var ground = new Sprite(game_x, ground_y);
	// ground.image = game.assets['assets/ground.png'];

	ground.x = 0;
	ground.y = game_y - ground_y;
	gameScene.addChild(ground);
	gameScene.addEventListener("enterframe", function() {
		if (game.input.upw) {
			fire(p1, p1_cannon);
		}
		p1.fireCooldown -= 1;
		if(game.input.up){
			fire(p2, p2_cannon);
		}
		p2.fireCooldown -=1;
		if(game.currentScene.age % 120 == 0) {
			addEnemy(ground,p1,p2);
		}
	});
	var label2 = new Label();
	label2.width = p1textwidth;
	label2.height = p1textheight;
	label2.font = "12px 'Arial'";
	label2.color = 'rgb(0, 0, 0)';
	label2.y = p1locatioy;
	label2.x = p1locatiox;
	label2.addEventListener('enterframe', function(){
		this.text = "Player 1 Resources " + p1.resources;
	});
	gameScene.addChild(label2);
	var label2 = new Label();
	label2.width = p2textwidth;
	label2.height = p2textheight;
	label2.font = "12px 'Arial'";
	label2.color = 'rgb(0, 0, 0)';
	label2.y = p2locatioy;
	label2.x = p2locatiox;
	label2.addEventListener('enterframe', function(){
		this.text = "Player 2 Resources " + p2.resources;
	});
	gameScene.addChild(label2);
}
function makeBackground(image) {
	var bg = new Sprite(game_x, game_y);
	bg.image = image;
	return bg;
}
