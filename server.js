var  express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/posts');


var Post = mongoose.model('Post', {title: String, description: String});


app.use(express.static(__dirname + '/'));

app.get('/',function(req,res){
  
});

app.post('/posts',function(req,res){
  var post = new Post({title: req.body, description: req.body});
  post.save(function(err,postObj){
    if(err){
      console.log('cannot save');
    } else {
      console.log('saved data');
    }
  })
  res.json(post);
});
app.get('*',function(req,res){
  res.sendFile(__dirname + '/index.html');

});



app.listen(3000);