const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
        console.log(err);
    });


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());

//added to test body post request in emp
app.use(express.json({
    type: ['application/json', 'text/plain']
}))

app.use(express.urlencoded({extended: false}));
app.use(cookieParser('secret'));


const i18n = require('i18n');
i18n.configure({
    locales: ['pl', 'en'], // języki dostępne w aplikacji. Dla każdego z nich należy utworzyć osobny słownik
    directory: path.join(__dirname, 'locales'), // ścieżka do katalogu, w którym znajdują się słowniki
    objectNotation: true, // umożliwia korzstanie z zagnieżdżonych kluczy w notacji obiektowej
    cookie: 'absence-hr-lang', //nazwa cookies, które nasza aplikacja będzie wykorzystywać do przechowania informacji
});
app.use(i18n.init);

app.use((req, res, next) => {
    if (!res.locals.lang) {
        const currentLang = req.cookies['absence-hr-lang'];
        res.locals.lang = currentLang;
    }
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session');
app.use(session({
    secret: 'my-secret-password',
    resave: false
}))

app.use((req, res, next) => {
    const loggedUser = req.session.loggedUser;
    res.locals.loggedUser = loggedUser;
    if (!res.locals.loginError) {
        res.locals.loginError = undefined;
    }
    next();
})

const authUtil = require('./util/authUtils')

const employeeRouter = require('./routes/employeeRoute');
const reasonRouter = require('./routes/reasonRoute');
const absenceRouter = require('./routes/absenceRouter');

const empApiRouter = require('./routes/api/EmployeeApiRoute');
const reasonApiRouter = require('./routes/api/ReasonApiRoute');
const absenceApiRouter = require('./routes/api/AbsenceApiRoute');

app.use('/', indexRouter);
app.use('/employee', authUtil.permitAuthenticatedUser, employeeRouter);
app.use('/reason', reasonRouter);
app.use('/absence', absenceRouter);


app.use('/api/employee', empApiRouter);
app.use('/api/reason', reasonApiRouter);
app.use('/api/absence', absenceApiRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
