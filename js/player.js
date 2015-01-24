function Player(id) {
	this.id = id;
	this.fireCooldown = 0;
	this.resources = 30;
	this.hp = 1;
}

function fire(player,cannon,enemies) {
    if (player.fireCooldown <= 0 && player.resources != 0) {
	    var bullet = new Sprite(16, 16);
	    bullets.push(bullet);
	    // if (bullets.length > 10) {
	    // 	bullets.shift();
	    // }
	    bullet.x = (cannon.x + cannon_x * 0.5) - 8;
	    bullet.y = (cannon.y);
	    if (player.id == 1) {
	    	bullet.image = game.assets['assets/bullet.png'];
	    }
	    else {
	    	bullet.image = game.assets['assets/bullet_p2.png'];
	    }
	    bullet.addEventListener('enterframe', function(e) {
	        this.y -= 10;
	      	if(this.y < 0) {
	      		destroyBullet(bullets.indexOf(bullet));
	      		// console.log("Removed bullet " + this.id + " from bullets (exit).");
	      	}
		});
	    game.currentScene.addChild(bullet);
	    player.fireCooldown = 20;
	    player.resources -= 1;
	}
}

function destroyBullet (bulletIndex) {
	bullet = bullets[bulletIndex];
	// console.log("Bullets length is: " + bullets.length);
	// console.log("Removing bullet " + bulletIndex + " from bullets.");
	bullets.splice(bulletIndex, 1);
	bullet.clearEventListener("enterframe");
	game.currentScene.removeChild(bullet);
	// console.log("bullets length is now " + bullets.length);
}
