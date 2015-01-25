function Player(id) {
	this.id = id;
	this.cannon = new Sprite(cannon_w, cannon_h);
	this.fireCooldown = 0;
	this.resources = 30;
	this.hp = 1;
}
var counter = 0;
function player1died(endScene, game)
{
	gameover = true
	console.log("p1 has died");
	var label2 = new Label();
	label2.width = p2textwidthw;
	label2.height = p2textheightw;
	label2.font = "24px 'Arial'";
	label2.color = 'rgb(0, 0, 0)';
	label2.y = p2locatioyw;
	label2.x = p2locatioxw;
	label2.addEventListener('enterframe', function(){
		var curstate = startgame;
		if(startgame != curstate){destroy(this);}
		this.text = "Player 2 has won the game";
	});
	endScene.addChild(label2);
	if(firstrun == true) game.pushScene(endScene);
	if(counter == 5){
		firstrun =true;
		counter = 0;
	}
	counter++;
}
function player2died(endScene, game){
	gameover = true
	var label2 = new Label();
	label2.width = p1textwidthw;
	label2.height = p1textheightw;
	label2.font = "24px 'Arial'";
	label2.color = 'rgb(0, 0, 0)';
	label2.y = p1locatioyw;
	label2.x = p1locatioxw;
	var curstate = startgame;
	label2.addEventListener('enterframe', function(){
		if(startgame != curstate){destroy(this);}
		this.text = "Player 1 has won the game ";
	});
	endScene.addChild(label2);

	if(firstrun== true) game.pushScene(endScene);
	if(counter == 5){
		firstrun =true;
		counter = 0;
	}
	counter++;
}
function gameOverboth(endScene,game){
	var label2 = new Label();
	label2.width = p1textwidthw;
	label2.height = p1textheightw;
	label2.font = "40px 'Arial'";
	label2.color = 'rgb(0, 0, 0)';
	label2.y = game_h/2;
	label2.x = game_w/2;
	label2.addEventListener('enterframe', function(){
		var curstate = startgame;
		if(startgame != curstate){destroy(this);}
		this.text = "GAME OVER!! ";
	});
	endScene.addChild(label2);

	if(firstrun== true) game.pushScene(endScene);
	if(counter == 5){
		firstrun =true;
		counter = 0;
	}
	counter++;
}
function fire(player,cannon,enemies) {
    if (player.fireCooldown <= 0 && player.resources != 0) {
	    var bullet = new Sprite(16, 16);
	    bullets.push(bullet);
	    // if (bullets.length > 10) {
	    // 	bullets.shift();
	    // }
	    bullet.x = (cannon.x + cannon_w * 0.5) - 8;
	    bullet.y = (cannon.y);
	    if (player.id == 1) {
	    	bullet.image = game.assets['assets/bullet.png'];
	    }
	    else {
	    	bullet.image = game.assets['assets/bullet_p2.png'];
	    }
	    bullet.addEventListener('enterframe', function(e) {
				  if(gameover == true){destroyBullet(bullets.indexOf(bullet));}
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
	if(typeof bullet !== 'undefined')
	{
		bullet.clearEventListener("enterframe");
		game.currentScene.removeChild(bullet);
	}
	// console.log("bullets length is now " + bullets.length);
}
