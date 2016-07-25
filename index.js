"use strict";
var $ = document.querySelector.bind(document);

window.addEventListener("load", function() {
  // var stackmat = new SmoothMat();

  $("#flip").addEventListener("click", function() {
    $("display").classList.toggle("flipped");
  })

  stackmat.setCallBack(function(state) {
    $("#info").textContent = JSON.stringify(state, null, "  ");
    $("time").textContent = Stats.prototype.formatTime(state.time_milli);
    
    var showText = true;
    if (!state.running && (state.leftHand || state.rightHand)) {
      $("display").classList.add("red");
      showText = false;
    } else {
      $("display").classList.remove("red");
    }

    if (state.greenLight) {
      $("display").classList.add("green");
      showText = false;
    } else {
      $("display").classList.remove("green");
    }

    if (state.running) {
      $("display").classList.add("running");
      showText = false;
    } else {
      $("display").classList.remove("running");
    }

    if (showText && state.time_milli === 0) {
      $("text").classList.remove("hidden");
    } else {
      $("text").classList.add("hidden");
    }
  });
  stackmat.init();
})