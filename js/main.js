enchant();

window.onload = function() {
	var game = new Game(320, 320);
	game.fps = 60;
	game.preload('assets/chara1.png', 'assets/ground.png', 'assets/cannon.png', 'assets/bullet.png');
	game.onload = function () {

		initWorld();

	};

	function Player() {
		this.fireCooldown = 0;
		this.resources = 10;
	}

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
      var bullet;
	    gameScene.addEventListener("enterframe", function() {
	        if (game.input.up) {
				  bullet = fire(p1, p1_cannon);
			}
			p1.fireCooldown -= 1;
	    });

    gameScene.addEventListener('enterframe',function(){
       if(game.frame % 120 == 0){

            addEnemy(ground)
       }
   });
  }
  function addEnemy(ground){
    var enemy = new Sprite(16, 16);
    enemy.x = rand(320);
    enemy.y = 0;
    enemy.image = game.assets['assets/ground.png'];

    enemy.frame = 60;

    enemy.addEventListener('enterframe', function(e) {
          if(this.intersect(ground)){
          console.log("intersect!")
          game.currentScene.removeChild(this)
        }
          this.y += 1;

    });
    game.currentScene.addChild(enemy);
  }
  function rand(num){
    return Math.floor(Math.random() * num);
  }

	function fire(player,cannon) {
	    if (player.fireCooldown <= 0 && player.resources != 0) {
		    var bullet = new Sprite(16, 16);
		    bullet.x = (cannon.x + 50);
		    bullet.y = (cannon.y);
        //console.log(bullet.x)
		    bullet.image = game.assets['assets/bullet.png'];
		    bullet.addEventListener('enterframe', function(e) {
	            this.y -= 6;
              if(this.y < 0) game.currentScene.removeChild(this)

		    });
		    game.currentScene.addChild(bullet);
		    // console.log("bullet fired.");
		    player.fireCooldown = 20;
		    player.resources -= 1;
        return bullet;
		}
	}
	game.start();
}
