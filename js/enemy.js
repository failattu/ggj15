function addEnemy(ground) {
	var enemy = new Sprite(16, 16);
	enemy.x = rand(320);
	enemy.y = 0;
	enemy.image = game.assets['assets/ground.png'];

	enemy.frame = 60;

	enemy.addEventListener('enterframe', function(e) {
	    if(this.intersect(ground)) {
	    	console.log("intersect!");
	    	game.currentScene.removeChild(this);
	    }


	    this.y += 1;
	});
	game.currentScene.addChild(enemy);
	return enemy;
}
function rand(num) {
	return Math.floor(Math.random() * num);
}
