window.connections.peoplesearch.model.SearchResultEntryCollection = Backbone.Collection.extend({
    model: connections.peoplesearch.model.SearchResultEntry,

    initialize: function () {
        var self = this;
        self.url = window.connections.properties.profileSearchUrl;
    },

    parse: function (data) {
        var parsed = [],
            entry,
            id,
            name,
            photo,
            link;

        $(data).find('feed entry').each(function (index) {
            var entry = $(this),
                id = entry.children('id').text(),
                name = entry.children('title').text(),
                phone = entry.find('content abbr[title=cell]').next('span.value').text(),
                email = entry.find('content a[class=email]').text(),
                photo = entry.children('link[type=image]').attr('href'),
                link = entry.children('link[rel=related]').attr('href');

            parsed.push({
                id: id,
                name: name,
                email: email,
                phone: phone,
                photo: photo,
                link: link
            });
        });

        return parsed;
    },

    fetch: function (options) {
        options || (options = {});
        options.xhrFields = {
            withCredentials: true
        };
        options.cache = false;
        options.dataType = 'xml';
        Backbone.Collection.prototype.fetch.call(this, options);
    }
});