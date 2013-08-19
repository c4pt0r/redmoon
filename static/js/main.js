require.config({
	paths: {
 		jquery: '/static/lib/jquery.min',
 		underscore : '/static/lib/underscore-min',
 		backbone : '/static/lib/backbone-min',
 		pagenav : '/static/lib/pagenav',
 		templ_loader : '/static/lib/templ_loader',
 		bootstrap : '/static/lib/bootstrap.min',
 		router : '/static/js/router',
 		searchView : '/static/js/searchView',
 		naviBarView : '/static/js/naviBarView',
 		valueView : '/static/js/valueView',
 	},
 	shim: {
	    underscore: {
	      exports: '_'
	    },
	    backbone: {
	      deps: ["underscore", "jquery"],
	      exports: "Backbone"
	    }
	}
});

require(['app'],  function(app){
	app.init()
});