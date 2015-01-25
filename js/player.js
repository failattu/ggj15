function Player(id) {
	this.id = id;
	this.fireCooldown = 0;
	this.resources = 30;
	this.hp = 1;
}
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
		this.text = "Player 2 has won the game";
	});
	endScene.addChild(label2);
	if(firstrun== true) game.pushScene(endScene);
	firstrun =true;
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
	label2.addEventListener('enterframe', function(){
		this.text = "Player 1 has won the game ";
	});
	endScene.addChild(label2);

	if(firstrun== true) game.pushScene(endScene);
	firstrun =true;
}
function gameOverboth(endScene,game){
	var label2 = new Label();
	label2.width = p1textwidthw;
	label2.height = p1textheightw;
	label2.font = "40px 'Arial'";
	label2.color = 'rgb(0, 0, 0)';
	label2.y = game_y/2;
	label2.x = game_x/2;
	label2.addEventListener('enterframe', function(){
		this.text = "GAME OVER!! ";
	});
	endScene.addChild(label2);

	if(firstrun== true) game.pushScene(endScene);
	firstrun =true;
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
	bullet.clearEventListener("enterframe");
	game.currentScene.removeChild(bullet);
	// console.log("bullets length is now " + bullets.length);
}
