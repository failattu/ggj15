function addEnemy(ground,p1,p2) {
	var enemy = new Sprite(16, 16);
	enemy.x = rand(game_x);
	enemy.y = 0;
	enemy.image = game.assets['assets/bullet.png'];

	enemy.addEventListener('enterframe', function(e) {
	    if(this.intersect(ground)) {
				if(this.x < (game_x * 0.5)) {
					p1.resources -= 3
				}
				else {
					p2.resources -= 3
				}
				this.removeEventListener('enterframe');
	    	game.currentScene.removeChild(this);
	    }
	    for (i = bullets.length - 1; i >= 0; i--) {
        	currentBullet = bullets[i];
	    	if(this.intersect(currentBullet)) {
		    	console.log("intersect with bullet!");
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
