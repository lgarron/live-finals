"use strict";
var $ = document.querySelector.bind(document);

function setupFlipping() {
  if (localStorage.displayFlipped === "flipped") {
    $("display").classList.add("flipped");
  }
  $("#flip").addEventListener("click", function() {
    if ($("display").classList.contains("flipped")) {
      $("display").classList.remove("flipped");
      localStorage.displayFlipped = "";
    } else {
      $("display").classList.add("flipped");
      localStorage.displayFlipped = "flipped";
    }
  })
}

function setupTimer() {

  var mat = stackmat;
  // mat = new SmoothMat();

  mat.setCallBack(function(state) {
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
  mat.init();
}

window.addEventListener("load", function() {
  setupFlipping();
  setupTimer();
})