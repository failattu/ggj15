function Player() {
	this.fireCooldown = 0;
	this.resources = 10;
}

function fire(player,cannon) {
    if (player.fireCooldown <= 0 && player.resources != 0) {
	    var bullet = new Sprite(16, 16);
	    bullet.x = (cannon.x + 50);
	    bullet.y = (cannon.y);
	    bullet.image = game.assets['assets/bullet.png'];
	    bullet.addEventListener('enterframe', function(e) {
            this.y -= 10;
          	if(this.y < 0) {
          		this.clearEventListener("enterframe");
          		game.currentScene.removeChild(this);
          	}
	    });
	    game.currentScene.addChild(bullet);
	    player.fireCooldown = 20;
	    player.resources -= 1;
	    
	    bullets.push(bullet);
	    if (bullets.length > 6) {
	    	bullets.shift();
	    }
	    console.log(bullets);
	}
}