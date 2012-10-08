/**
 * StatusMessagesCollection
 */
window.connections.statusupdates.model.MessageCollection = Backbone.Collection.extend({
    model: window.connections.statusupdates.model.Message,

    initialize: function () {
        var self = this;
        self.url = window.connections.properties.boardEntriesUrl;
    },

    parse: function (data) {
        var self = this,
            parsed = [],
            entry,
            title,
            published,
            isComment,
            author,
            userId,
            name,
            email,
            photo,
            commentCounter = 0;

        $(data).find('entry').each(function (index) {
            entry = $(this);
            title = entry.children('title').text().replace(/\n/gm, '<br/>');
            published = entry.children('published').text();
            isComment = entry.children('id').text().indexOf('comment') > -1;
            commentCounter = isComment ? commentCounter = commentCounter + 1 : 0;

            author = entry.find('author');
            userId = author[0].childNodes[1].firstChild.nodeValue; // Using standard DOM. Getting nodes with namespaces is buggy when the browser is Chrome.
            name = $('name', author).text();
            email = $('email', author).text();
            photo = window.connections.properties.profilePhotoUrl + '?userid=' + userId;

            parsed.push({
                title: title,
                published: published,
                published_formatted: self.formatDate(published),
                author: {
                    id: userId,
                    name: name,
                    email: email,
                    photo: photo
                },
                is_comment: isComment,
                is_first_comment: commentCounter === 1,
                reply_url: entry.children('link[rel=replies]').attr('href')
            });
        });
        return parsed;
    },

    formatDate: function (dateStr) {
        var date = $.trim(dateStr.replace(/[TZ]/g, ' '));
        date = $.format.date(date, 'MMM dd \'yy') + ' at ' + $.format.date(date, 'HH:mm');
        return date;
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