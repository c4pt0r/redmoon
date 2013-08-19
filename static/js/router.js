define([
  'jquery',
  'underscore',
  'backbone',
  'searchView',
  'valueView'
], function($, _, Backbone, SearchView, valueView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      'searchkey': 'searchkey',
      'console': 'console',
      'value/:key': 'value',
      '*actions': 'defaultRoute'
    }
  });

  var initialize = function(){
    var app_router = new AppRouter();
    app_router.on('route:searchkey', function(){
    });
    app_router.on('route:value', function(key){
      valueView.render();
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
