const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express();

const COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

app.get('/', function(req, res){
  res.json({test: "welcome to comments app API"})
})

app.get('/api/comments', function(req, res){
  fs.readFile(COMMENTS_FILE, function(err, data){
    if(err){
      console.log(err);
      res.send(err);
    }else {
      res.json(JSON.parse(data))
    }
  })
})

app.post('/api/comments', function(req, res){
  fs.readFile(COMMENTS_FILE, function(err, data){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      let comments = JSON.parse(data)
      let comment = {
        id: req.body.id,
        author: req.body.author,
        text: req.body.text
      }
      comments.push(comment)
      fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err){
        if(err){
          console.log(err);
          res.send(err);
        }else{
          res.json(comments)
        }
      })
    }
  })
})

app.listen(3000, function(err){
  if(err){
    console.log("server gagal jalan");
  }
  console.log("server jalan");
});
