var ufotimer = 0.0;
function addEnemy(ground, p1, p2, groundArt) {
	if (ufoActive) {

	}
	else if (ufotimer > ufoSpawnTime) {
		addUfo(ground, p1, p2);
		ufoActive = true;
		ufotimer = 0;
	}
	else {
		addSmallEnemy(ground, p1, p2, groundArt);
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
		if(gameover == true){destroy(this);}
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
			    	//  explosionFx(this.x, this.y);
			    	destroyBullet(i);
			    	// console.log("Removed bullet " + i + " from bullets (collide).");

			    	if (this.hp <= 0) {
				    	ufoDestruction(this);
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
	var enemy = new Sprite(32, 32);
	enemy.x = rand(game_x - game_x * 0.1) + game_x * 0.05;
	// enemy.x = 200;
	enemy.y = 0;
	enemy.image = game.assets['assets/enemy.png'];

	enemy.addEventListener('enterframe', function(e) {
			if(gameover == true){destroy(this);}
	    if(this.intersect(ground)) {
			if(this.x < (game_x * 0.5)) {
				p1.resources -= 3
				game.assets['assets/collideground.wav'].play();
			}
			else {
				p2.resources -= 3
				game.assets['assets/collideground.wav'].play();
			}
			explosionFx(this.x, this.y);
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
		    	explosionFx(this.x, this.y);

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
	    if(gameover == true){destroy(this);}
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

function explosionFx (x, y) {
	var exp = new Sprite(32, 32);
	exp.x = x;
	exp.y = y;
	exp.opacity = 0;
	exp.rotation = rand(360);
	exp.pastPeak = false;
	exp.image = game.assets['assets/explosion.png'];

	exp.addEventListener('enterframe', function () {
		if (exp.pastPeak == false) {
			exp.opacity = Math.round((exp.opacity + 0.15) * 10) / 10;
			if (exp.scaleX < 2) {
				exp.scale(1.4, 1.4);
			}
			else {
				exp.scale(0.8, 0.8);
			}
			if (exp.opacity >= 1) {
				exp.pastPeak = true;
			}
		}
		else {
			exp.opacity = Math.round((exp.opacity - 0.15) * 10) / 10;
			exp.scale(0.9,0.9);
			if (exp.opacity <= 0) {
				destroy(exp);
			}
		}
		exp.rotation += 15;
	});

	game.currentScene.addChild(exp);
}

function ufoDestruction (ufo) {
	var dyingUfo = new Sprite(ufo.width, ufo.height);
	dyingUfo.image = game.assets['assets/ufo.png'];
	dyingUfo.x = ufo.x;
	dyingUfo.y = ufo.y;
	dyingUfo.deathFrame = 0;

	destroy(ufo);

	dyingUfo.addEventListener('enterframe', function(e) {
		if (dyingUfo.deathFrame < 180) {
			dyingUfo.deathFrame += 1;
			// console.log("deathframe is " + dyingUfo.deathFrame);
			if (dyingUfo.deathFrame % 10 == 0) {
				dyingUfo.x += rand(10) - 5;
				dyingUfo.y += rand(10) - 5;
				expX = dyingUfo.x + rand(dyingUfo.width/2) + dyingUfo.width*0.25;
				expY = dyingUfo.y + rand(dyingUfo.height/2) + dyingUfo.height*0.25;
				explosionFx(expX, expY);
				game.assets['assets/hitenemy.wav'].play();
			}
		}	
		else {
			ufoActive = false;
			ufoSpawnTime = 60 * (rand(20) + 10);
			destroy(dyingUfo);
		}
	});
	game.currentScene.addChild(dyingUfo);	
}