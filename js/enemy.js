function addEnemy(ground,p1,p2) {
	if (ufoActive) {

	}
	else if (game.currentScene.age % 360 == 0) {
		addUfo(ground, p1, p2);
		ufoActive = true;
	}
	else {
		addSmallEnemy(ground,p1,p2);
	}
}

function addUfo (ground, p1, p2) {
	var ufo_x = game_x * 0.6;
	var ufo_y = game_y * 0.3;
	var ufo = new Sprite(ufo_x, ufo_y);
	ufo.image = game.assets['assets/ground.png'];
	ufo.x = game_x * 0.5 - ufo_x * 0.5;
	ufo.y = 0 - game_y * 0.2;
	ufo.opacity = 0;
	ufo.hp = rand(15) + 5;
	
	ufo.addEventListener('enterframe', function(e) {
	    if (this.opacity < 1) {
	    	this.opacity += 0.005;
	    }
	    if (this.intersect(ground)) {
	    	// add game over for both here
			this.removeEventListener('enterframe');
	    	game.currentScene.removeChild(this);
	    }
	    for (i = bullets.length - 1; i >= 0; i--) {
        	currentBullet = bullets[i];
	    	if(this.intersect(currentBullet)) {
		    	console.log("intersect with bullet!");
		    	currentBullet.removeEventListener("enterframe");
		    	game.currentScene.removeChild(currentBullet);
		    	bullets.splice(i, 1);

		    	if (this.hp <= 0) {
			    	this.removeEventListener("enterframe");
			    	game.currentScene.removeChild(this);
			    }
			    else {
			    	this.hp -= 1;
			    	nudgeDirection = rand(2);
			    	if (nudgeDirection == 1) {
			    		this.x -= 2;
			    	}
			    	else {
			    		this.x += 2;
			    	}
			    	this.y -= 2;
			    }
	   		}
        }
    	this.y += 0.5;
	});

	game.currentScene.addChild(ufo);
}

function addSmallEnemy (ground, p1, p2) {
	var enemy = new Sprite(16, 16);
	enemy.x = rand(game_x);
	enemy.y = 0;
	enemy.image = game.assets['assets/bullet.png'];

	enemy.addEventListener('enterframe', function(e) {
	    if(this.intersect(ground)) {
				if(this.x < (game_x * 0.5)) {
					p1.resources -= 3
					game.assets['assets/collideground.wav'].play();
				}
				else {
					p2.resources -= 3
					game.assets['assets/collideground.wav'].play();
				}
				this.removeEventListener('enterframe');
	    	game.currentScene.removeChild(this);
	    }
	    for (i = bullets.length - 1; i >= 0; i--) {
        	currentBullet = bullets[i];
	    	if(this.intersect(currentBullet)) {
		    	console.log("intersect with bullet!");
				game.assets['assets/hitenemy.wav'].play();
		    	currentBullet.removeEventListener("enterframe");
		    	game.currentScene.removeChild(currentBullet);
		    	this.removeEventListener("enterframe");
		    	game.currentScene.removeChild(this);
		    	bullets.splice(i, 1);
	   		}
        }
    	this.y += 3;
	});
	game.currentScene.addChild(enemy);
}

function rand(num) {
	return Math.floor(Math.random() * num);
}
