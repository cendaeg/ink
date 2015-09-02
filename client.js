// In renderer process (web page).
var ipc = require('ipc');

function connectToChannel(channel) {
  ipx.send('channel-connect', channel);
}
