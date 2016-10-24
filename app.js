var Post = Backbone.Model.extend({
  defaults: {
    title: '',
    description: ''
  }
});

var Posts = Backbone.Collection.extend({});



var posts = new Posts();

var PostView = Backbone.View.extend({
  model: new Post(),
  tagName: 'tr',
  initialize: function() {
    this.template = _.template($('.posts-list-template').html());
  },
  events: {
    'click .edit-post': 'edit',
    'click .update-post': 'update',
    'click .cancel': 'cancel',
    'click .delete-post': 'delete'
  },
  edit: function() {
    $('.edit-post').hide();
    $('.delete-post').hide();
    this.$('.update-post').show();
    this.$('.cancel').show();

    var title = this.$('.title').html();
    var description = this.$('.description').html();
    

    this.$('.title').html('<input type="text" class="form-control title-update" value="' + title + '">');
    this.$('.title').html('<input type="text" class="form-control description-update" value="' + description + '">');

  },
  update: function() {
    this.model.set('title', $('.title-update').val());
    this.model.set('description', $('.description-update').val());
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