var EventLoop = function EventLoop() {
  this.callbacks = {}; 
  this.events = [];
}

EventLoop.prototype.on = function on(evt, callback) {
  if (this.callbacks[evt]) {
    var oldCb = this.callbacks[evt]; 
    this.callbacks[evt] = function() {
      callback(); 
      oldCb();
    };
    return;
  }
  
  this.callbacks[evt] = callback;
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
    this.callbacks[evt]();
  } 
  this.started = false;
}
