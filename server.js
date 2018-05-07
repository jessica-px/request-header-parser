const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  const headerInfo = parseHeader(req);
  res.send(JSON.stringify(headerInfo));
})

const parseHeader = (req) => {
  const headerInfo = {
    'ip-address': parseIP(req),
    'language': parseLangage(req),
    'OS': parseOS(req)
  }
  return headerInfo;
}

const parseIP = (req) => {
  let ip = req.header("x-forwarded-for");
  if (ip == null){
    ip = 'local'
  }
  return ip;
}

const parseLangage = (req) => {
  const input = req.header("accept-language");
  return input.slice(0, 2);
}

const parseOS = (req) => {
  const input = req.header("user-agent");
  return input.match(/(?<=\().*?(?=\))/)[0]; // first set of characters enclosed in parentheses
}

app.listen(port);

