var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var ipc = require('ipc');
var chat = require('irc');


// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OSX it is common for applications and their menu bar 
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, frame: false, title: "ink"});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  var server = function(url) {
    this.channels = {};
    this.url = url;
    this.login = function login(nick, pass) {
      if(pass) {
        this.pass = pass;
      }
      this.nick = nick;
    };
  };

  ipc.on('server-connect', function(event, server_url) {
    var currentServer = new server(server_url);
  });

  ipc.on('channel-connect', function(event, server) {
    var client = new chat.Client('irc.yourserver.com', 'myNick', {
      channels: ['#channel'],
    });
  });
});
