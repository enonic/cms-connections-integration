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
    },

    events: {
        'keyup input[type=text]': 'handleKeyUp',
        'keydown input[type=text]': 'handleKeyDown',
        'keypress input[type=text]': 'handleKeyPress'
    },

    timer: -1,

    handleKeyUp: function (event) {
        var self = this,
            textInputValue;

        clearTimeout(self.timer);
        self.timer = setTimeout(function() {
            if (self.isValidKeyStroke(event)) {
                textInputValue = $.trim(self.textInput.val());
                self.list.search(textInputValue);
            } 
        }, 200);
    },

    handleKeyDown: function (event) {
        clearTimeout(this.timer);
    },

    handleKeyPress: function(event) {
        var keyCode = event.keyCode;
        if (keyCode >= 37 && keyCode <= 40) { // Arrow keys
            var direction = keyCode === 40 || keyCode === 39 ? 'next' : 'prev';
            this.list.select(direction);
        } 
    },

    isValidKeyStroke: function (event) {
        var keyCode = event.keyCode;
        var isArrowKeys = keyCode >= 37 && keyCode <= 40;
        var isEnterKey = keyCode === 13;

        return !(isArrowKeys || isEnterKey);
    }
});