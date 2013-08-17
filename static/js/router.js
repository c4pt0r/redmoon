define([
  'jquery',
  'underscore',
  'backbone',
  'searchView'
], function($, _, Backbone, SearchView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      'searchkey': 'searchkey',
      'console': 'console',
      '*actions': 'defaultRoute'
    }
  });

  var initialize = function(){
    var app_router = new AppRouter();
    app_router.on('route:searchkey', function(){
      var view = new SearchView();
      view.render();
    });
    app_router.on('route:console', function(){
      console.log('console');
    });
    app_router.on('route:defaultRoute', function(actions){
      console.log('No route:', actions);
    });
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
