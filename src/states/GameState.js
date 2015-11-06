import GameTimer from '../objects/GameTimer';

class GameState extends Phaser.State {
  preload () {
    this.game.load.spritesheet('button', 'assets/play_pause.png', 32, 16);
    this.game.load.spritesheet('2xButton', 'assets/2x.png', 16, 16);
    this.game.load.spritesheet('6xButton', 'assets/6x.png', 16, 16);
    this.game.load.spritesheet('12xButton', 'assets/12x.png', 16, 16);
  }

  create () {
    this.gameTimer = new GameTimer(this.game);
  }
}

export default GameState;
