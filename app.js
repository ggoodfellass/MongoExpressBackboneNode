Backbone.Model.prototype.idAttribute = '_id';
var Post = Backbone.Model.extend({
  defaults: {
    title: '',
    description: ''
  }
});

var Posts = Backbone.Collection.extend({
  url: 'http://localhost:3000/posts',

});

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
    this.$('.description').html('<input type="text" class="form-control description-update" value="' + description + '">');
  },
  update: function() {
    this.model.set('title', $('.title-update').val());
    this.model.set('description', $('.description-update').val());
  },
  cancel: function() {
    postsView.render();
  },
  delete: function() {
    this.model.destroy({
      success: function(response){
        console.log('successfully deleted with id :' + response.toJSON()._id);
      },
      error: function(){
        console.log('cannot delete');
      }
    });
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

var PostsView = Backbone.View.extend({
  model: posts,
  el: $('.posts-list'),
  initialize: function() {
    var self = this;
    this.model.on('add', this.render, this);
    this.model.on('change', function() {
      setTimeout(function() {
        self.render();
      }, 30);
    },this);
    this.model.on('remove', this.render, this);
    this.model.fetch({
      success: function(response){
        _.each(response.toJSON(),function(item){
          console.log('successfully got post id with' + item._id);
        });
      },
      error: function(){
        console.log('failed to get ');
      }
    });

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

$(document).ready(function() {
  $('.add-post').on('click', function() {
    var post = new Post({
      title: $('.title-input').val(),
      description: $('.description-input').val()
    });
    $('.title-input').val('');
    $('.description-input').val('');
    console.log(post.toJSON());
    posts.add(post);
    post.save(null,{
      success: function(response){
        console.log('successfully saved ' + response.toJSON()._id);
      },
      error: function(){
        console.log('failed to save post');
      }
    });
  })
})