function addEnemy(ground) {
	var enemy = new Sprite(16, 16);
	enemy.x = rand(320);
	enemy.y = 0;
	enemy.image = game.assets['assets/bullet.png'];

	enemy.addEventListener('enterframe', function(e) {
	    if(this.intersect(ground)) {
	    	console.log("intersect!");
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
    	this.y += 1;
	});
	game.currentScene.addChild(enemy);
}
function rand(num) {
	return Math.floor(Math.random() * num);
}
