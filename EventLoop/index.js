var EventLoop = function EventLoop() {
  this.callback = {}; 
  this.events = [];
}

EventLoop.prototype.on = function on(evt, callback) {
  if (this.callback[evt]) {
    var oldCb = this.callback[evt]; 
    this.callback[evt] = function() {
      callback(); 
      oldCb();
    };
  } 
  else 
  {
    this.callback[evt] = callback;
  }
}

EventLoop.prototype.trigger = function trigger(evt) {
  this.events.push(evt); 
  if (!this.started) {
    this.start();
  }
}

EventLoop.prototype.start = function start() {
  while (this.events.length > 0) {
    this.started = true; 
    var evt = this.events.shift(); 
    this.callback[evt]();
  } 
  this.started = false;
}
