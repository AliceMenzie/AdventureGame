'use strict';

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');
const { Dialogflow, FacebookMessenger, Slack } = require("jovo-platform-dialogflow");

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const app = new App();

app.use(
  new Alexa(),
  new GoogleAssistant(),
  new JovoDebugger(),
  new FileDb(),
  new Dialogflow().use(new Slack(), new FacebookMessenger())
);

// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
  LAUNCH() {
    // let speech = 'Do you either go through the blue door, or through the red door?';
    // let reprompt = 'You have two options, the blue door, or the red door.';
    // this.ask(speech, reprompt);
    return this.toIntent("WhichDoorIntent");
},

WhichDoorIntent(){
  let speech = 'Do you either go through the blue door, or through the red door?';
    let reprompt = 'You have two options, the blue door, or the red door.';
    this.ask(speech, reprompt);
},

Unhandled() {
  return this.toIntent('LAUNCH');
},

EnterDoorIntent() {
  let speech = '';
  let reprompt = '';

  if (this.$inputs.color.value === 'blue' || this.$inputs.color.value === 'red') {
      speech = 'You chose to go through the ' + this.$inputs.color.value + ' door.';
      this.tell(speech);
  } else {
      speech = 'Please choose either the blue door or the red door.';
      reprompt = 'Say blue door, or red door.';
      this.ask(speech, reprompt);
  }
},
});

module.exports = { app };
