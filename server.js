var  express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');


app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());



mongoose.connect("mongodb://localhost/postmanager");
var PostsSchema = new mongoose.Schema({
  title : String,
  description: String
});

var Posts = mongoose.model("posts",PostsSchema);

app.get("/posts", function(req,res){
  Posts.find(function(err,docs){
    docs.forEach(function(item){
      console.log('REcived a Get request for _id' + item._id);

    })
    res.json(docs);

  });
  
});

app.post("/posts", function(req, res){
  console.log('recived a Post reques');
  for (var key in req.body){
    console.log(key + ':' + req.body[key]);
  }
  var post = new Posts(req.body);
  post.save(function(err,doc){
    res.send(doc)
  });

});

app.put("/posts/:id", function(req,res){
  var id = req.params.id;
   var Post = Posts.findById(id, function(err, post) {
      if(err) throw err;
      post.title = req.body,
      post.description = req.body
      post.save(function(err) {
        if(err) throw err;
        res.send(post);
      });
    });
  res.json(Post);
});



app.delete("/posts/:id", function(req,res){
  console.log('received delete req for id:' + req.params.id);
  Posts.remove({_id: req.params.id},function(err){
    res.send({_id: req.params.id});
  });
});



app.get('*',function(req,res){
  res.sendFile(__dirname + '/index.html');

});



app.listen(3000);