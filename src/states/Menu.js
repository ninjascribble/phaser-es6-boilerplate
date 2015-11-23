import TextButton from '../controls/TextButton';
import style from '../services/style';

export default class Menu extends Phaser.State {
  create () {
    const textButton = new TextButton(this.game, {
      text: 'Sandbox',
      callback: () => { this.game.state.start('GameState'); },
      x: 50,
      y: 30,
      width: 120,
      height: 50,
      textStyle: style.text()
    });

    this.game.add.existing(textButton);
  }
}
