define([
	'jquery',
	'underscore',
	'backbone',
	'templ_loader',
	'bootstrap'
], 
function($, _ ,Backbone, Tmpl, bootstrap) {
	var ValueView = Backbone.View.extend({
		el: '#model-container',
		initialize: function() {
			
		},
		setKey : function (key) {

		},
		render: function() {
			$('#myModal').modal('toggle');
		}
	});

	var instance = new ValueView();
	return instance
});