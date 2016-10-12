var Post = Backbone.Model.extend({
  validate: function(attrs,opts){
    if(attrs.title  && typeof attrs.title !== 'string'){
      return "title should be a string";
    }
  },
  urlRoot: '/posts'

});