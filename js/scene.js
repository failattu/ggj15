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
var firstrun = false;
var gameover = false;
var startgame = 0;
function initWorld() {
	var endScene = new Scene();
	var startScene = new Scene();
	var gameScene = new Scene();
	game.pushScene(startScene);
	var bgstart = makeBackground(game.assets['assets/startscreen.png'])
	bgstart.addEventListener('touchstart', function(){
		console.log("touchstarted")
		stargame = true;
		game.pushScene(gameScene);
	});
	var bgend = makeBackground(game.assets['assets/bg.png'])
	bgend.addEventListener('touchstart', function(){
		console.log("touchstarted")
		p1.resources = 30;
		p2.resources = 30;
		ufotimer = 0;
		firstrun = false;
		gameover = false;
		startgame += 1;
		game.pushScene(startScene);
	});
	startScene.addChild(bgstart);
	endScene.addChild(bgend);
	var p1 = new Player(1);
	var p2 = new Player(2);
	p1.cannon.image = game.assets['assets/cannon.png'];
	p2.cannon.image = game.assets['assets/cannon_p2.png'];
	var bg = makeBackground(game.assets['assets/bg.png'])
	gameScene.addChild(bg);

	p1.cannon.x = game_w * 0.25 - cannon_w * 0.5;
	p1.cannon.y = game_h - groundArt_h*1.15;
	p2.cannon.x = game_w * 0.75 - cannon_w * 0.5;
	p2.cannon.y = game_h - groundArt_h*1.15;

	gameScene.addChild(p1.cannon);
	gameScene.addChild(p2.cannon);
  	p1.cannon.addEventListener("enterframe", function(){
    	if(p1.resources > 0) {
			if (game.input.lefta && !game.input.rightd) {
				if (this.x >= 0) this.x -= 5;
			}
    		if (game.input.rightd && !game.input.lefta) {
				if(this.x <= game_w * 0.5 - cannon_w) this.x += 5;
			}
		}
		else {
			player1died(endScene, game);
		}
  	});

	p2.cannon.addEventListener("enterframe", function(){
		if(p2.resources > 0) {
			if (game.input.left && !game.input.right) {
				if (this.x >= game_w * 0.5) this.x -= 5;
			}
			if (game.input.right && !game.input.left) {
				if(this.x <= game_w - cannon_w)this.x += 5;
			}
		}
		else {
			player2died(endScene, game)
		}
	});
	var ground = new Sprite(game_w, ground_h);
	// ground.image = game.assets['assets/ground.png'];

	ground.x = 0;
	ground.y = game_h - ground_h;
	gameScene.addChild(ground);
	var groundArt = new Sprite(game_w, groundArt_h);
	groundArt.x = 0;
	groundArt.y = game_h - groundArt_h;
	groundArt.image = game.assets['assets/ground.png'];
	gameScene.addChild(groundArt);
	gameScene.addEventListener("enterframe", function() {
		if(gameover == true){
			gameOverboth(endScene,game);
			}
		if (game.input.upw) {
			fire(p1, p1.cannon);
		}
		p1.fireCooldown -= 1;
		if(game.input.up){
			fire(p2, p2.cannon);
		}
		p2.fireCooldown -=1;
		if(ufoActive == false) ufotimer += 1
		if(game.currentScene.age % 120 == 0) {
			addEnemy(ground, p1, p2, groundArt);
		}
	});

	creatertxt(p1, gameScene);
	creatertxt(p2, gameScene);
}
function makeBackground(image) {
	var bg = new Sprite(game_w, game_h);
	bg.image = image;
	return bg;
}
function creatertxt(player, scene) {
	var rt = new Label();
	rt.width = rt_w;
	rt.height = rt_h;
	rt.font = "12px 'Exo 2'";
	rt.color = 'rgb(0, 0, 0)';
	rt.y = rt_y;
	if (player.id == 1) {
		rt.x = rt_x_p1;
		rt.addEventListener('enterframe', function(){
			this.text = "Player 1 Resources " + player.resources;
		});
	}
	else {
		rt.x = rt_x_p2;
		rt.addEventListener('enterframe', function(){
			this.text = "Player 2 Resources " + player.resources;
		});
	}
	scene.addChild(rt);
}
