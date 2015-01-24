var bullets = [];

function initWorld() {
	var gameScene = new Scene();
	game.pushScene(gameScene);

	var p1 = new Player();
	var p2 = new Player();

    var p1_cannon = new Sprite(100,100);
    p1_cannon.image = game.assets['assets/cannon.png'];

    p1_cannon.x = 30;
    p1_cannon.y = 248;

    gameScene.addChild(p1_cannon);

    p1_cannon.addEventListener("enterframe", function(){
        if (game.input.left && !game.input.right) {
			if (this.x != -50) this.x -= 1;
		}
        if (game.input.right && !game.input.left) {
			if(this.x < 274)this.x += 1;
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
		if(game.frame % 120 == 0) {
			addEnemy(ground);
		}
    });
}