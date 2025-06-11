var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Handle GET request to '/hello' and respond with 'Hello World!!!!!!'
app.get('/hello', (req, res) => {
    res.send('Hello World!!!!!!');
});

// Handle GET request to '/json' and respond with a simple json including id/name/date
app.get('/json', (req, res) => {
    res.json(
        {
            id: 1,
            name: "Catcher in the Rye"
        }
    )});

// Handle GET request to '/image' and send an image file '/public/images/logo.svg'
app.get('/image', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'images', 'logo.svg'));
});

// // Handle GET request to '/data', respond the query 'name' with a 'Get Data' and query message.
// app.get('/data', (req, res) => {
//     const name = req.query.name || 'Guest';
//     res.send(`Get Data: ${name}`);
// });

app.use(express.json());
// Handle POST request to '/data', respond with the json data including 'get data' msg.
app.post('/data', (req, res) => {
    const name = req.body.text || 'Guest';
    res.json({ message: `Get Data: ${name}` });
});

app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;



