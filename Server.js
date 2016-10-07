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
app.listen(3000, function () {
    console.log('Listening...');
});
