import GameTimer from '../objects/GameTimer';

class GameState extends Phaser.State {
  preload () {
    this.game.load.spritesheet('button', 'assets/play_pause.png', 32, 16);
  }

  create () {
    let text = new GameTimer(this.game);
    // text.anchor.set(0.5);
  }
}

export default GameState;
