enchant();
var game = new Game(320, 320);
game.fps = 60;
game.preload('assets/chara1.png', 'assets/ground.png', 'assets/cannon.png', 'assets/bullet.png');
game.onload = function () {
	initWorld();
};
