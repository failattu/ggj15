enchant();
var game = new Game(game_x, game_y);
game.fps = 60;
game.keybind(65, 'lefta');
game.keybind(68, 'rightd');
game.keybind(87, 'upw');
game.keybind(83, 'downs');
game.preload('assets/chara1.png', 'assets/ground.png', 'assets/bground.png', 'assets/cannon.png', 'assets/bullet.png');
game.onload = function () {
	initWorld();
};
