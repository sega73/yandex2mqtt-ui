const express = require('express');
const app = express();
//const fs = require('fs');
// const app = express.express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function (req, res) {
    res.render('index');
  });
app.get('/vue', function (req, res) {
    res.render('index_vue');
  });
  // app.get('/img', function (req, res) {
  //   console.log(req);
  // });
  app.use(express.static('assets'));
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  //let payload_obj = JSON.parse("{\"temperature\":54.4,\"timestamp\":\"2024.01.13 15:35:00\"}");
  //console.log(payload_obj.temperature);