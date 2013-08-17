define([
	'jquery',
	'underscore',
	'backbone',
	'templ_loader',
	'/static/lib/pagenav.js'
], 
function($, _ ,Backbone, Tmpl, PageNav) {
	var count_per_page = 20;
	var results = null;
	
	pageNav.pre="<<";  
    pageNav.next=">>";
	var gotoPage = function(p) {
		$('#search-result tr').remove()
		$('#search-result').append('<tr><th>Key Name</th><th>Type</th></tr>')
		for (var i = (p-1) * count_per_page ; i < p * count_per_page && i < results.length ; i++) {
			$('#search-result').append('<tr><td>' + results[i] + '</td><td>' + i + '</td></tr>')
		}
	}

	var SearchResultView = Backbone.View.extend({
		el: $('#app-container'),
		showResult : function (r) {
			results = r ? r.sort() : [];
			var page_count = Math.ceil(results.length / count_per_page);
			this.render();

			pageNav.fn = function(p,pn){
				gotoPage(p)
		    };
			pageNav.go(1, page_count);
		},
		render : function() {
		    var data = {};
		    var search_res_tmpl = render('search_result')
		    var compiledTemplate = _.template( search_res_tmpl, data );
		    this.$el.html( compiledTemplate );
		    return this;
		  }
		});
	var instance = new SearchResultView()
	return instance
});