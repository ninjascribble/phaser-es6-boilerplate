export default class GameLog extends Phaser.Text {
  constructor (game) {
    super(game, 350, 50, 'Log', { font: '14px Arial', fill: '#fff', align: 'left' });

    this.text = 'Log\n';
    this.game.stage.addChild(this);
  }

  log (text) {
    this.text += text + '\n';
  }
}
