const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send(JSON.stringify(req.headers));
})

app.listen(port);