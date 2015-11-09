import timer from '../services/timer';
import messenger from '../services/messenger';

export default class GameTimer extends Phaser.Text {
  constructor (game) {
    let buttonYOffset = 20;
    let buttonXOffset = -20;

    super(game, 50, 50, '0', { font: '14px Arial', fill: '#fff', align: 'left' });

    this.playPauseButton = game.add.button(this.x + buttonXOffset, this.y + buttonYOffset, 'button', this.pauseResume, this, 1, 0, 2);
    this.speed2xButton = game.add.button(this.x + 32 + buttonXOffset, this.y + buttonYOffset, '2xButton', this.set2x, this, 1, 0, 2);
    this.speed6xButton = game.add.button(this.x + 32 + 16 + buttonXOffset, this.y + buttonYOffset, '6xButton', this.set6x, this, 1, 0, 2);
    this.speed12xButton = game.add.button(this.x + 32 + 16 + 16 + buttonXOffset, this.y + buttonYOffset, '12xButton', this.set12x, this, 1, 0, 2);

    this.game.time.events.loop(0, this.tick, this).timer.start();
    this.game.stage.addChild(this);
    messenger.listen('timer:stateChanged', this.updateUI, this);
  }

  pauseResume () {
    if (timer.paused) {
      timer.resume();
    } else {
      timer.pause();
    }
  }

  set2x () {
    this.setMultiplier(2);
  }

  set6x () {
    this.setMultiplier(6);
  }

  set12x () {
    this.setMultiplier(12);
  }

  setMultiplier (multiplier) {
    if (multiplier === timer.multiplier) {
      timer.setMultiplier(1);
    } else {
      timer.setMultiplier(multiplier);
    }
  }

  updateUI () {
    switch (timer.multiplier) {
      case 1:
        this.speed2xButton.setFrames(1, 0, 2);
        this.speed6xButton.setFrames(1, 0, 2);
        this.speed12xButton.setFrames(1, 0, 2);
        break;
      case 2:
        this.speed2xButton.setFrames(4, 3, 5);
        this.speed6xButton.setFrames(1, 0, 2);
        this.speed12xButton.setFrames(1, 0, 2);
        break;
      case 6:
        this.speed2xButton.setFrames(1, 0, 2);
        this.speed6xButton.setFrames(4, 3, 5);
        this.speed12xButton.setFrames(1, 0, 2);
        break;
      case 12:
        this.speed2xButton.setFrames(1, 0, 2);
        this.speed6xButton.setFrames(1, 0, 2);
        this.speed12xButton.setFrames(4, 3, 5);
        break;
    }

    if (timer.paused) {
      this.playPauseButton.setFrames(4, 3, 5);
    } else {
      this.playPauseButton.setFrames(1, 0, 2);
    }
  }

  tick () {
    this.text = this.getSecondsElapsed();
  }

  getSecondsElapsed () {
    return Math.round(timer.currentTime / 1000);
  }
}