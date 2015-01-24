function initWorld() {
	var gameScene = new Scene();
	game.pushScene(gameScene);
	var enemylist = []
	var p1 = new Player();
	var p2 = new Player();
	var enemy = new Sprite(16, 16);
	var bullet = new Sprite(16, 16);
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
				  if (p1.fireCooldown <= 0 && p1.resources != 0) {

						bullet.x = (p1_cannon.x + 50);
						bullet.y = (p1_cannon.y);
					//console.log(bullet.x)
						bullet.image = game.assets['assets/bullet.png'];
						bullet.addEventListener('enterframe', function(e) {
									this.y -= 6;          if(this.y < 0) game.currentScene.removeChild(this)

						});
						game.currentScene.addChild(bullet);
						// console.log("bullet fired.");
						p1.fireCooldown = 20;
						p1.resources -= 1;

				}
		}
		p1.fireCooldown -= 1;

	  if(game.frame % 220 == 0  || typeof enemy === 'undefined') {

			enemy.x = rand(320);
			enemy.y = 0;
			enemy.image = game.assets['assets/ground.png'];

			enemy.frame = 60;

			enemy.addEventListener('enterframe', function(e) {
					if(this.intersect(ground)) {
						console.log("intersect!");
						this.clearEventListener('enterframe')
						game.currentScene.removeChild(this);
					}
					if(this.intersect(bullet)){
						this.clearEventListener('enterframe')
						game.currentScene.removeChild(this);
					}
					this.y += 1;
			});
			game.currentScene.addChild(enemy);
			return enemy;
		}
	});

}
