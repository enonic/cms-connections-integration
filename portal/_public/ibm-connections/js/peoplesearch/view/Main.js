window.connections.peoplesearch.view.Main = Backbone.View.extend({
	initialize: function () {
		this.render();
	},

    render: function() {
		this.form = new connections.peoplesearch.view.Form({ 
			el: $('#ibm-conn-peoplesearch-form'),
			listEl: $('#ibm-conn-peoplesearch-list')
		});
    }
});
