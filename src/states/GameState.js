import TimerCtrl from '../controls/TimerCtrl';

import GameLog from '../objects/GameLog';
import Event from '../objects/Event';

import timer from '../services/timer';
import events from '../services/eventQueue';

export default class GameState extends Phaser.State {
  preload () {
    this.game.load.spritesheet('button', 'assets/play_pause.png', 32, 16);
    this.game.load.spritesheet('2xButton', 'assets/2x.png', 16, 16);
    this.game.load.spritesheet('6xButton', 'assets/6x.png', 16, 16);
    this.game.load.spritesheet('12xButton', 'assets/12x.png', 16, 16);
  }

  create () {
    timer.init(this.game);
    events.init(this.game);

    this.gameTimer = new TimerCtrl(this.game);
    this.logger = new GameLog(this.game);
    this.game.time.events.loop(0, this.tick, this).timer.start();

    events.push(new Event(function () {
      this.logger.log('5 second event');
    }, this), 5000);

    events.push(new Event(function () {
      this.logger.log('50 second event');
    }, this), 50000);

    events.push(new Event(function () {
      this.logger.log('pause event');
      timer.pause();
    }, this), 71000);
  }

  tick () {
    // check the event queue
    let activeEvent = events.getActive(timer.currentTime);

    if (activeEvent) {
      activeEvent.fire();
    }
  }
}
