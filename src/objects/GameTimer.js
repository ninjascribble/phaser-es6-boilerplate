export default class GameTimer extends Phaser.Text {
  constructor (game) {
    super(game, 50, 50, '0', { font: '25px Arial', fill: '#fff', align: 'left' });

    this.playPauseButton = game.add.button(this.x, this.y + 50, 'button', this.pauseResume, this, 1, 0, 2);
    this.speed2xButton = game.add.button(this.x + 16, this.y + 50, '2xButton', this.pauseResume, this, 1, 0, 2);
    this.speed6xButton = game.add.button(this.x + 16 + 16, this.y + 50, '6xButton', this.pauseResume, this, 1, 0, 2);
    this.speed12xButton = game.add.button(this.x + 16 + 16 + 16, this.y + 50, '12xButton', this.pauseResume, this, 1, 0, 2);
    this.currentTime = 0;
    this.speed = 10;
    this.game.time.events.loop(this.speed, this.tick, this).timer.start();
    this.multiplier = 1;
    this.game.stage.addChild(this);
  }

  pause () {
    this.paused = true;
  }

  resume () {
    this.paused = false;
  }

  pauseResume () {
    this.paused = !this.paused;

    if (this.paused) {
      this.playPauseButton.setFrames(4, 3, 5);
    } else {
      this.playPauseButton.setFrames(1, 0, 2);
    }
  }

  setMultiplier (multiplier) {
    switch (multiplier) {
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
      default:
        this.speed2xButton.setFrames(1, 0, 2);
        this.speed6xButton.setFrames(1, 0, 2);
        this.speed12xButton.setFrames(1, 0, 2);
        multiplier = 1;
        break;
    }

    this.multiplier = multiplier;
  }

  tick () {
    if (!this.paused) {
      this.currentTime += this.speed * this.multiplier;
    }

    this.text = this.getSecondsElapsed();
  }

  getSecondsElapsed () {
    return this.currentTime / 1000;
  }
}
