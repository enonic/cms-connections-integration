window.connections.peoplesearch.view.List = Backbone.View.extend({
    initialize: function () {
		this.collection = new connections.peoplesearch.model.SearchResultEntryCollection();       
    },

    search: function (name) {
    	var self = this;
        
        if (name.length === 0) {
            self.collection.reset();
            self.render(null);
            return;
        }

        self.collection.fetch({
            data: { 
            	format: 'full', 
            	name: name
            }, 
            success: function (data) {
                self.render(data);
            },
            error: function () {
                throw new Error('Fetch error');
            }
        })
    },

    render: function (data) {
        var	source = $('#ibm-conn-tpl-peoplesearch-list').html(),
            template = Handlebars.compile(source),
            collection = this.collection.toJSON();

        if (collection.length > 0) {
	        this.$el.html(template({people: collection}));
            this.postRender();
        } else {
	        this.$el.html(template({}));
        }
    },

    postRender: function () {
        var self = this;
        // Add IBM business card 
        if (typeof SemTagSvc.parseDom === 'function') {
            // TODO: Better selectors
            self.$el.find('.ibm-conn-profile-business-card').each(function (i) {
                SemTagSvc.parseDom(null, $(this)[0]);
            });
        }
    },

    select: function (direction) {
        var $selected = this.$el.find('li.ibm-conn-peoplesearch-selected'),
            $lists,
            $sibling;

        if ($selected.length === 0) {
            $lists = this.$el.find('li');
            $sibling = direction === 'next' ? $lists.filter(':first') : $lists.filter(':last');
            $sibling.addClass('ibm-conn-peoplesearch-selected');
        } else {
            $sibling = direction === 'next' ? $selected.next() : $selected.prev();
            $selected.removeClass('ibm-conn-peoplesearch-selected');
            if ($sibling.length === 1) {
                $sibling.addClass('ibm-conn-peoplesearch-selected');
            } else {
                this.select(direction);
            }
        }
    }

});