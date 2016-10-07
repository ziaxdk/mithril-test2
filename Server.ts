import * as Express from 'express'
import * as BodyParser from 'body-parser'

var app = Express();

app.use(Express.static('./'));
app.use(BodyParser.json());


app.post('/api/check', (req, res) => {
  // setTimeout(()=> {
    req.body.foo = req.body.foo + " - with server";
    res.send(req.body);

  // }, 1000)
})

app.listen(3000, () => {
  console.log('Listening...')
})

