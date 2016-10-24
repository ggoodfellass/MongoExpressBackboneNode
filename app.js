var Post = Backbone.Model.extend({
  defaults: {
    title: '',
    description: ''
  }
});

var Posts = Backbone.Collection.extend({
});

var post1 = new Post({
  title: 'shakeel',
  description: 'nothing'
});


var posts = new Posts([post1]);

var PostView = Backbone.View.extend({
  model: new Post(),
  tagName: 'tr',
  initialize: function() {
    this.template = _.template($('.posts-list-template').html());
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});


var PostsView = Backbone.View.extend({
  model: posts,
  el: $('.posts-list'),
  initialize: function(){
    this.model.on('add',this.render,this);
  },
  render: function() {
    var self = this;
    this.$el.html('');
    _.each(this.model.toArray(), function(post) {
      self.$el.append((new PostView({model: post})).render().$el);
    });
    return this;
  }
});

var postsView = new PostsView();
$(document).ready(function(){
  $('.add-post').on('click',function(){
    var post = new Post({
      title: $('.title-input').val(),
      description: $('.description-input').val()
    });
    console.log(post.toJSON());
    posts.add(post);
  })
})