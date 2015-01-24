function Player() {
	this.fireCooldown = 0;
	this.resources = 10;
	this.hp = 1;
}

function fire(player,cannon,enemies) {
    if (player.fireCooldown <= 0 && player.resources != 0) {
	    var bullet = new Sprite(16, 16);
	    bullet.x = (cannon.x + 50);
	    bullet.y = (cannon.y);
    //console.log(bullet.x)
	    bullet.image = game.assets['assets/bullet.png'];
	    bullet.addEventListener('enterframe', function(e) {
            this.y -= 6;          if(this.y < 0) game.currentScene.removeChild(this)

	    });
	    game.currentScene.addChild(bullet);
	    // console.log("bullet fired.");
	    player.fireCooldown = 20;
	    player.resources -= 1;

	}
}
