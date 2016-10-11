"use strict";
var Express = require('express');
var BodyParser = require('body-parser');
var app = Express();
app.use(Express.static('./'));
app.use(BodyParser.json());
app.post('/api/check', function (req, res) {
    // setTimeout(()=> {
    req.body.foo = req.body.foo + " - with server";
    res.send(req.body);
    // }, 1000)
});
app.post('/api/ahead', function (req, res) {
    req.body.ahead = req.body.ahead + '... ahead of time...';
    res.send(req.body);
});
app.listen(3000, function () {
    console.log('Listening...');
});
