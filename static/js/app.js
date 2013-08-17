define([
	'jquery',
	'underscore',
	'backbone',
	'templ_loader',
	'router',
	'naviBarView'
], 
function($, _ ,Backbone, Tmpl, Router, NaviBarView) {
	var init = function () {
		Router.initialize();
		var navi = new NaviBarView();
		navi.render();
	}
	return { 
		init : init
	}; 
});