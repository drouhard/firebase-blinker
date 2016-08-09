'use strict';

const firebase = require('firebase');
const five = require("johnny-five");

const config = require('./config.js');
const board = new five.Board();
let led;

firebase.initializeApp(config.firebaseConfig);
const database = firebase.database();

board.on("ready", function() {
  console.log("board ready");
  led = new five.Led(config.ledPin);

  databse.ref(config.watchedPath).on('value', snapshot => {
      // blink on/off in 500ms intervals
      led.blink(500);
      this.wait(4000, function() {
        // stop() terminates the interval
        // off() shuts the led off
        led.stop().off();
      });
  });
});

database.ref(config.watchedPath).on('value', snapshot => {
    console.log('value = ' + snapshot.val() );
});

database.ref(config.watchedPath).set('new');
