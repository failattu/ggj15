var ufotimer = 0.0;
function addEnemy(ground,p1,p2) {
	if (ufoActive) {

	}
	else if (ufotimer % ufoSpawnTime == 0) {
		addUfo(ground, p1, p2);
		ufoActive = true;
		ufotimer = 0;
	}
	else {
		addSmallEnemy(ground,p1,p2);
	}
}

function addUfo (ground, p1, p2) {
	var ufo_x = game_x * 0.6;
	var ufo_y = game_y * 0.3;
	var ufo = new Sprite(ufo_x, ufo_y);
	ufo.image = game.assets['assets/ufo.png'];
	ufo.x = game_x * 0.5 - ufo_x * 0.5;
	ufo.y = 0 - game_y * 0.2;
	ufo.opacity = 0;
	ufo.hp = rand(15) + 5;

	ufo.addEventListener('enterframe', function(e) {
	    if (this.opacity < 1) {
	    	this.opacity += 0.005;
	    }
	    if (this.intersect(ground)) {
	    	gameover = true;
	    	ufoActive = false;
			destroy(this);
	    }
	    else {
		    for (i = 0; i < bullets.length; i++) {
	        	currentBullet = bullets[i];
		    	if(this.intersect(currentBullet)) {
			    	// console.log("intersect with bullet!");
			    	game.assets['assets/hitenemy.wav'].play();
			    	destroyBullet(i);
			    	// console.log("Removed bullet " + i + " from bullets (collide).");

			    	if (this.hp <= 0) {
				    	destroy(this);
				    	ufoActive = false;
				    	ufoSpawnTime = 60 * (rand(20) + 10);
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
	    }
    	this.y += 0.5;
	});

	game.currentScene.addChild(ufo);
}

function addSmallEnemy (ground, p1, p2) {
	var enemy = new Sprite(16, 16);
	enemy.x = rand(game_x - game_x * 0.1) + game_x * 0.05;
	// enemy.x = 200;
	enemy.y = 0;
	enemy.image = game.assets['assets/enemy.png'];

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
			destroy(this);
	    }
	    for (i = 0; i < bullets.length; i++) {
        	currentBullet = bullets[i];
	    	if(this.intersect(currentBullet)) {
		    	// console.log("intersect with bullet!");
				game.assets['assets/hitenemy.wav'].play();
		    	// console.log("i is " + i + ", currentBullet is " + currentBullet.id);
		    	destroyBullet(i);
		    	// console.log("Removed bullet " + i + " from bullets (collide).");

		    	if (rand(10) <= 5) {
		    		spawnScrap(this.x, this.y, ground, p1, p2);
		    	}

		    	destroy(this);
	   		}
        }
    	this.y += 3;
	});
	game.currentScene.addChild(enemy);
}

function spawnScrap(startX, startY, ground, p1, p2) {
	scrap = new Sprite(24, 12);
	scrap.x = startX;
	scrap.y = startY;
	scrap.image = game.assets['assets/scrap.png'];
	game.currentScene.addChild(scrap);
	scrap.x_direction = rand(10) - 5;
	scrap.addEventListener('enterframe', function(e) {
	    if(this.intersect(ground)) {
			if(this.x < (game_x * 0.5)) {
				p1.resources += 1
				// game.assets['assets/collideground.wav'].play();
			}
			else {
				p2.resources += 1
				// game.assets['assets/collideground.wav'].play();
			}
			destroy(this);
	    }
    	this.y += this.age - 8;
    	this.x += this.x_direction;
	});
}
