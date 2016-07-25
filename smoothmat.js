"use strict";

var SmoothMat = function() {
  this.stateTime = null;
  this.state = null;
  this.callback = function() {};

  this.animFrameActive = false;
  this.animFrame = function() {
    console.log("frame", this.state);
    if (this.state) {
      var time = this.state.time_milli;
      if (this.state.on && this.state.running) {
        // time += Date.now() - this.stateTime - 100;
        // if (time < 0) {
        //   time = 0;
        // }
      }
      this.callback(time);

      if (this.state.running) {
        requestAnimationFrame(this.animFrame);
      } else {
        this.stopAnimFrame();
      }
    }
  }.bind(this);
}

SmoothMat.prototype = {
  init: stackmat.init,
  stop: function() {
    stackmat.stop();
    cancelAnimationFrame(this.animFrame)
  },

  startAnimFrame: function() {
    console.log("start");
    if (!this.animFrameActive) {
      this.animFrameActive = true;
      requestAnimationFrame(this.animFrame);
    }
  },

  stopAnimFrame: function() {
    this.animFrameActive = false;
    cancelAnimationFrame(this.animFrame)
  },

  setCallBack: function(callback) {
    this.callback = callback;

    stackmat.setCallBack(function(state) {
      $("#info").textContent = JSON.stringify(state, null, "  ");
      this.stateTime = Date.now();
      this.state = state;
      if (this.state.running) {
        this.startAnimFrame();
      } else {
        this.stopAnimFrame();
        this.animFrame(); // One last frame.
      }
    }.bind(this))
  },

  __proto__: stackmat
}