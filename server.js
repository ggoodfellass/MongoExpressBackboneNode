var  express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');

app.use(express.static(__dirname + '/'));

app.get('/',function(req,res){
  res.send('shakeel ka node');
  console.log('shakee')
});

app.get('*',function(req,res){
  res.sendFile(__dirname + '/index.html');

});



app.listen(3000);