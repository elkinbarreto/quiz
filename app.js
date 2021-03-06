var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');
var routes = require('./routes/index');


var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


//helpers dinamicos
app.use(function(req, res, next){
    
            
        //guardar path en session.redir par despues de login
        if(!req.path.match(/\/login|\/logout/)){
            
            req.session.redir = req.path;
            if(req.session.user){
                    var d = new Date(); // captumarmos la fecha actual
                    var hora = d.getTime(); // obtenemos el tiempo en milisegundos
                    if(req.session.hora){//si existe el campo hora como variable de sesion 

                        //restamos la hora actual con la ultima hora almacenada el resultado en en milisegundos
                        //dividimos por 60000 (1 minuto = 60000 miliseg)
                        if(((hora - req.session.hora)/60000)>=2){
                             delete req.session.hora;
                             delete req.session.user;
                             //res.redirect('/login');
                        }
                           
                    }
                    else{//si no existe el campo hora como variable de sesion, la creamos y le asignamos la hora actual
                        req.session.hora = hora;
                    }
            }
        }

    

    //hacer visible req.session en las vistas
    res.locals.session = req.session;

    next();
});

app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors:[]
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors:[]
    });
});


module.exports = app;
