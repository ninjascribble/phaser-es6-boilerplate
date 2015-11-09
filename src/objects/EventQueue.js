export default class EventQueue {
  constructor () {
    this.events = [];
  }

  push (event, time) {
    this.events.push({
      time: time,
      event: event
    });

    this.events.sort(function (a, b) {
      return a - b;
    });
  }

  pop () {
    return this.events.shift();
  }

  peek () {
    return this.events[0];
  }

  // check to see if events are pending
  // TODO: implement pausing and non-pausing events
  // TODO: grab all non-pausing events until a pausing event is found
  getActive (time) {
    let event = this.peek();

    if (event && event.time < time) {
      return this.pop().event;
    }
  }
}
