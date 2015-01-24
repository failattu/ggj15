function addEnemy(ground) {
	var enemy = new Sprite(16, 16);
	enemy.x = 100;
	enemy.y = 0;
	enemy.image = game.assets['assets/bullet.png'];

	enemy.addEventListener('enterframe', function(e) {
	    if(this.intersect(ground)) {
	    	console.log("intersect!");
	    	game.currentScene.removeChild(this);
	    }
	    for (i = bullets.length - 1; i >= 0; i--) {
        	currentBullet = bullets[i];
	    	if(this.intersect(currentBullet)) {
		    	console.log("intersect bullet!");
		    	currentBullet.clearEventListener("enterframe");
		    	game.currentScene.removeChild(currentBullet);
		    	this.clearEventListener("enterframe");
		    	game.currentScene.removeChild(this);
	   		}
        }
    	this.y += 1; 
	});
	game.currentScene.addChild(enemy);
}
function rand(num) {
	return Math.floor(Math.random() * num);
}