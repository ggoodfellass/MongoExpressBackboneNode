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
  Posts.find({},function(err,docs){
    if(err) throw err;
    res.send(docs);
  });
});

app.post("/posts", function(req, res){
  var post = new Posts({
    title :req.body,
    description :req.body

   }).save(function(err,docs){
    if(err) throw err;
    res.send(docs);
  });
   res.json(post);
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
  var id = req.params.id;
  Posts.findById(id, function(err, post) {
      post.remove(function(err) {
        if(err) throw err;

      });
    });
});



app.get('*',function(req,res){
  res.sendFile(__dirname + '/index.html');

});



app.listen(3000);