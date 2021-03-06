define([
	'jquery',
	'underscore',
	'backbone',
	'templ_loader',
	'searchView',
	'/static/lib/pagenav.js'
	], 
	function($, _ ,Backbone, Tmpl, searchView, pageNav) {
		var NaviBarView = Backbone.View.extend({
			el: $('#nav-container'),
			events: {
				"click #search-btn": "doSearch",
			},
			doSearch : function () {
				var pattern = $('#keys-input').val() ? $('#keys-input').val() : '*';
				$.post('/keys', { pattern : pattern }, function(v) {
					console.log(v);
					var results = eval(v);
					searchView.showResult(results);
				})
			},
			render : function() {
				var data = {};
				var tmpl = load_template('navibar');
				this.$el.html( tmpl );
				return this;
			}
		});
		return NaviBarView;
	});