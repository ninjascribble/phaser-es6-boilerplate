export default class GameTimer extends Phaser.Text {
  constructor (game) {
    super(game, 50, 50, '0', { font: '25px Arial', fill: '#fff', align: 'left' });

    this.button = game.add.button(this.x, this.y + 50, 'button', this.pauseResume, this, 1, 0, 2);
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
      this.button.setFrames(4, 3, 5);
    } else {
      this.button.setFrames(1, 0, 2);
    }
  }

  setMultiplier (multiplier) {
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
