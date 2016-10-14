var Post = Backbone.Model.extend({
  
  urlRoot: '/posts',
  idAttribute: '_id'
});
var main= $('#main');
var appView = Backbone.View.extend({

});


var post= new Post({_id: 1});

post.fetch();
