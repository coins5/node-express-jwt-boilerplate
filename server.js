var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    bodyParser      = require('body-parser'),
    compress        = require('compression'),

app = express();
app.use(compress());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(err, req, res, next) {
    if (err.name === 'StatusError') {
        res.send(err.status, err.message);
    } else {
        next(err);
    }
});

if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
    app.use(errorhandler());
}
// Routes we use.
app.use(require('./app/anonymous-routes'));
app.use(require('./app/protected-routes'));
app.use(require('./app/user-routes'));

var port = process.env.PORT || 2193;

http.createServer(app).listen(port, function (err) {
    console.log('listening in http://localhost:' + port);
});

/*  
    // console.dir(app._router.stack);
    for(var i =0; i<app._router.stack.length-1; i++) {
        if(app._router.stack && app._router.stack[i].handle && app._router.stack[i].handle.stack) {
            console.log(app._router.stack);
            console.dir(app._router.stack[i].handle.stack[1].route);
        }
    }
*/