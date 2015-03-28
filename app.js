// asdf

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var writer = require('express-writer');
var cons = require('consolidate');
var redis = require('redis');
var _ = require('lodash');

var SocketioServer = require('socket.io');

var fs = require('fs');
var hbs = require('handlebars');
var partials = "./views/";

var lessMiddleware = require('less-middleware');

var app = express();
var server;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));


// Assign the swig engine to .html files
app.engine('html', cons.handlebars);
app.set('view engine', 'html');

// Register partials
fs.readdirSync(partials).forEach(function (file) {
  var source = fs.readFileSync(partials + file, "utf8"),
      partial = /(.+)\.html/.exec(file).pop();

  hbs.registerPartial(partial, source);
});



app.use(lessMiddleware({
  src: __dirname + '/resources/',
  dest: __dirname + '/public/',
  debug: true,
  force: true
}));

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {

  app.use(express.errorHandler());

// Our environment for static file rendering
} else if ('dist' == app.get('env')) {

  app.use(writer.watch);

}

// Out static site's routes
app.get('/', routes.index);

server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  console.log('Node environment is ' + app.get('env'));
});

// redis client
var redisClient = redis.createClient();
redisClient.on('connect', function() {
  var userlist = [];
  var messagelist = [];
  var objectlist = {};

  redisClient.set('userlist', JSON.stringify(userlist));
  redisClient.set('messagelist', JSON.stringify(messagelist));
  redisClient.set('objectlist', JSON.stringify(objectlist));
});

// web sockets
var io = new SocketioServer(server);
io.on('connection', function(socket) {
  var username;

  console.log('a user connected');
  
  socket.on('disconnect', function() {
    console.log('a user disconnected');
    if (!username) return;
    redisClient.get('userlist', function(err, reply) {
      var userlist = JSON.parse(reply);
      _.remove(userlist, function(u) {
        return u === username;
      });
      redisClient.set('userlist', JSON.stringify(userlist));
      io.emit('userlist', userlist);
    });
  });

  socket.on('registration', function(msg) {
    username = msg.username;

    // load the user list
    redisClient.get('userlist', function(err, reply) {
      var userlist = JSON.parse(reply);
      userlist.push(username);
      redisClient.set('userlist', JSON.stringify(userlist));
      io.emit('userlist', userlist);
    });

    // load the message list
    redisClient.get('messagelist', function(err, reply) {
      var messagelist = JSON.parse(reply);
      io.emit('messagelist', messagelist);
    });

    // load the state of the table
    redisClient.get('objectlist', function(err, reply) {
      var objectlist = JSON.parse(reply);
      
      io.emit('objectlist', objectlist);
    });
  });

  socket.on('chat message', function(msg) {
    // Don't process message before registration.
    if (!username) return;

    // TODO: look into using broadcast and optimistic adding of message to 
    // client side list before server deals with it.
    // broadcast message to all clients except the sender
    // socket.broadcast.emit(msg);
    
    // maintain messages sent through redis
    redisClient.get('messagelist', function(err, reply) {
      var messagelist = JSON.parse(reply);
      messagelist.push(msg);

      //console.log(messagelist);
      redisClient.set('messagelist', JSON.stringify(messagelist));
    });

    // for simplicity, send message to all connected clients including the sender
    io.emit('chat message', msg);
  });

  socket.on('move', function(msg) {
    // TODO: maintain the location of the objects through redis

    //console.log("id: " + msg.obj_id + "pos: " + msg.pos)
    redisClient.get('objectlist', function(err, reply) {
      var objectlist = JSON.parse(reply);
      // determine the correct way to maintain the objects in redis here
      objectlist[msg.obj_id] = msg.pos;
      redisClient.set('objectlist', JSON.stringify(objectlist));
    });

    socket.broadcast.emit('move', msg);
  });

});
