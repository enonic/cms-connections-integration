window.connections.statusupdates.view.Main = Backbone.View.extend({
    initialize: function () {
        this.render();
    },

    render: function () {
        this.form = new connections.statusupdates.view.Form({ el: $('#ibm-conn-status-form') });
        this.list = new connections.statusupdates.view.List({ el: $('#ibm-conn-status-list') });
    }
});
