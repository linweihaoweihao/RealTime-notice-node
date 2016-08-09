/**
 * Created by linweihao on 16/5/31.
 */
module.exports = function(router){
    var Socket = require('./socket.js')
    router.get('/notice',function(req, res, next){
        var mess = req.query.m || "hello Word"
        Socket.notice(mess)
        res.send('sucess')
    })

    setInterval(notice, 2000)
    function notice(){
        //定时更新，新消息通知可以调用
        Socket.notice(new Date().getTime())
    }
}