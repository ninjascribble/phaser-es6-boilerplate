import TimerCtrl from '../controls/TimerCtrl';
import Modal from '../controls/Modal';
import GameLog from '../objects/GameLog';
import Event from '../objects/Event';

import events from '../services/events';
import timer from '../services/timer';

export default class GameState extends Phaser.State {
  preload () {
    Phaser.game = this.game;
    this.game.load.spritesheet('button', 'assets/play_pause.png', 32, 16);
    this.game.load.spritesheet('2xButton', 'assets/2x.png', 16, 16);
    this.game.load.spritesheet('6xButton', 'assets/6x.png', 16, 16);
    this.game.load.spritesheet('12xButton', 'assets/12x.png', 16, 16);
  }

  create () {
    const defaultModalOptions = {
      width: 500,
      height: 300
    };

    timer.init(this.game);
    this.gameTimer = new TimerCtrl(this.game);
    this.logger = new GameLog(this.game);
    this.game.time.events.loop(0, this.tick, this).timer.start();
    this.modal = new Modal(this.game, defaultModalOptions);

    events.push(new Event(() => {
      const modalOptions = {
        text: 'A light dismiss.',
        lightDismiss: true,
        callback: () => {
          timer.resume();
        },
        context: this
      };

      this.logger.log('5 second event');
      this.modal.show(modalOptions);
      timer.pause();
    }, this), 5000);

    events.push(new Event(() => {
      const modalOptions = {
        text: 'A not so light dismiss.',
        callback: () => {
          timer.resume();
        },
        context: this,
        buttons: [{
          text: 'ok',
          callback: () => {
            timer.resume();
            this.modal.hide();
          },
          context: this
        }]
      };

      this.logger.log('10 second event');
      this.modal.show(modalOptions);
      timer.pause();
    }, this), 10000);

    events.push(new Event(() => {
      this.logger.log('15 second event');
    }, this), 15000);

    events.push(new Event(() => {
      this.logger.log('20 second event');
    }, this), 20000);

    events.push(new Event(() => {
      const modalOptions = {
        text: "Finally, we're finished.",
        buttons: [{
          text: 'back',
          callback: () => {
            this.game.state.start('Menu');
          }
        }]
      };

      this.logger.log('pause event');
      this.modal.show(modalOptions);
      timer.pause();
    }, this), 25000);
  }

  tick () {
    // check the event queue
    let activeEvent = events.getActive(timer.currentTime);

    if (activeEvent) {
      activeEvent.fire();
    }
  }
}
