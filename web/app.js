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
  app.get('/api/get_users', (req, res) => {
    // res.send('bb!')
    const auth_h = req.get('Authorization')
    // console.log(auth_h)
    auth_d = auth_h.split(' ')
    if(auth_d.length < 2) {
      res.json({error:"Invalid auth header"})
    }
    else if(auth_d[0] != "Bearer") {
      res.json({error:"Invalid auth type"})
    }
    else if(auth_d[1] != "test-token") {
      res.json({error:"Not authorized"})
    }
    else {
      res.json([{login:"admin", name:"Administrator", edit:false},
        {login:"user1", name:"User 1", edit:false},
        ])
    }    
  })
  // app.get('/img', function (req, res) {
  //   console.log(req);
  // });
  app.use(express.static('assets'));
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  //let payload_obj = JSON.parse("{\"temperature\":54.4,\"timestamp\":\"2024.01.13 15:35:00\"}");
  //console.log(payload_obj.temperature);