define([
	'jquery',
	'underscore',
	'backbone',
	'templ_loader',
	'/static/lib/pagenav.js'
], 
function($, _ ,Backbone, Tmpl, PageNav) {
	var count_per_page = 20;
	pageNav.pre="<<";
	pageNav.next=">>";

	var SearchKeyResult = Backbone.Model.extend({
		defaults : {  
			keyName : '',  
			type : '',
		}
	});

	var SearchKeyResults = Backbone.Collection.extend({
		model: SearchKeyResult
	});

	var results = new SearchKeyResults();

	var SearchResultItemView = Backbone.View.extend({
		el: '#search-result',
		className : "key-item",
		template : _.template("<tr id=search_result_<%=cid%>><td><a href=#value/<%=keyName%>><%=keyName%></a></td><td><%=type%></td></tr>"),
		initialize: function() {
			var that = this;
			this.model.bind('change', function() {
				var item_id = 'search_result_' + this.cid;
				$('#' + item_id).replaceWith(that.template(_.extend(this.toJSON(), {cid:this.cid})));
			});
		},
		render: function(){
			var compiledTemplate = this.template(_.extend(this.model.toJSON(), {cid:this.model.cid}));
			this.$el.append( compiledTemplate );
			//this.model.updateType();
			return this;
		}
	});

	var gotoPage = function(p) {
		$('#search-result tr').remove()
		$('#search-result').append('<tr><th>Key Name</th><th>Type</th></tr>');
		var pageItems = {};
		for (var i = (p-1) * count_per_page ; i < p * count_per_page && i < results.length ; i++) {
			var item = new SearchResultItemView({model:results.at(i)});
			if (results.at(i).get('type') == "")
				pageItems[results.at(i).get('keyName')] = results.at(i);
			item.render();
		}
		var line = "";
		_.each(pageItems, function(e) {
			line += e.get('keyName') + ",";
		});
		if (line != "") {
			$.post('/keytype', {keys:line}, function(v) {
				var types = eval('[' + v + ']')[0]
				_.each(types, function(v, k) {
					pageItems[k].set('type', v)
				})
			});
		} else {
			console.log('cached')
		}
	}

	var SearchResultView = Backbone.View.extend({
		el: $('#app-container'),
		showResult : function (r) {
			r = r.sort()
			results.reset()
			for (var i = 0; i < r.length; i++) {
				var item = r[i];
				results.add(new SearchKeyResult({keyName:item}))
			}

			var page_count = Math.ceil(results.length / count_per_page);
			this.render({keyword: $('#keys-input').val(), count:results.length});

			pageNav.fn = function(p,pn){
				gotoPage(p)
			};

			pageNav.go(1, page_count);
		},
		render : function(data) {
			var search_res_tmpl = load_template('search_result', data)
			this.$el.html( search_res_tmpl );
			return this;
		  }
	});
	var instance = new SearchResultView()
	return instance
});