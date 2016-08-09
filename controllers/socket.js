/**
 * Created by linweihao on 16/4/19.
 */
var  session = require('express-session')
    , RedisStore = require('connect-redis')(session)
    , sessionMiddleware = session({
        cookie: {maxAge: (1000 * 3600 * 24)},
        store: new RedisStore({client: require('redis').createClient(6379, '127.0.0.1')}), // XXX redis server config
        secret: "keyboard",
        resave: false,
        saveUninitialized: true
    })
    , Socket = null

exports.initSockect = function (server) {

    var io = require('socket.io')(server);
    io.use(function (socket, next) {
        sessionMiddleware(socket.request, socket.request.res, next);
    });
    io.of('/chat').on('connection', function (socket) {
        Socket = socket
        console.log('connection...' + JSON.stringify(socket.request.session))
    });

}


exports.notice = function (doc) {
    if(Socket!=null) {
        Socket.broadcast.emit('message', {userName: "servers", message: doc})
        Socket.emit('message', {userName: "servers", message: doc})
    }
}