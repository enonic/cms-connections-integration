window.connections.peoplesearch.view.Form = Backbone.View.extend({
    initialize: function () {
        this.render();
        this.textInput = this.$el.find('input[type=text]');
        this.list = new connections.peoplesearch.view.List({el: this.options.listEl });
    },

    render: function () {
        var source = $('#ibm-conn-tpl-peoplesearch-form').html(),
            template = Handlebars.compile(source);

        this.$el.html(template, {});
    }

});