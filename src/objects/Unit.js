export default class Unit extends Phaser.Sprite {
  constructor (game, x, y, initialValues) {
    super(game, x, y, '', 0);

    this.experience = 0;

    this.brains = initialValues.brains;
    this.brawn = initialValues.brawn;
    this.focus = initialValues.focus;
    this.charm = initialValues.charm;
    this.fortune = initialValues.fortune;
  }
}
