/**
 * StatusMessagesCollection
 */  
window.connections.statusupdates.model.MessageCollection = Backbone.Collection.extend({
    model: window.connections.statusupdates.model.Message,

    initialize: function () {
        var self = this;
        self.url = window.connections.properties.boardEntriesUrl;
    },

    parse: function(data) {
        var self = this,
            parsed = [], 
            entry, 
            summary,
            published,
            isComment,
            author,
            userId,
            name,
            email,
            photo,
            commentCounter = 0;
            
        $(data).find('entry').each(function (index) {
            entry           = $(this);
            summary         = entry.children('summary').text();
            published       = entry.children('published').text();
            isComment       = entry.children('id').text().indexOf('comment') > -1;
            commentCounter  = isComment ? commentCounter = commentCounter + 1 : 0;

            author  = entry.find('author');
            userId  = author[0].childNodes[1].firstChild.nodeValue; // Using standard DOM. Getting nodes with namespaces is buggy when the browser is Chrome.
            name    = $('name', author).text();
            email   = $('email', author).text();
            photo   = window.connections.properties.profilePhotoUrl + '?userid=' + userId;
            
            parsed.push({
                summary: self.linkifyComment(summary).replace(/\n/gm, '<br/>'),
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

    linkifyComment: function(comment) {
        var c = comment;
        var webUriPattern   = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w/\+%_#:\(\)\.-]*(\?\S+)?)?)?)/gim;
        var webUriResultPattern = '<a href="$1" title="$1" target="_blank">$1</a>';
        var spotifyUriPattern   = /(spotify:\w+:\w+)/gim;
        var spotifyUriResultPattern = '<a href="$1" title="$1" target="_blank">$1</a>';
        
        c = c.replace(webUriPattern, webUriResultPattern);
        c = c.replace(spotifyUriPattern, spotifyUriResultPattern);
        
        return c;
    },

    formatDate: function(dateStr) {
        /*
        var date = $.trim(dateTimeStr.replace(/[TZ]/g,' '));
        var now = $.format.date(new Date(), 'MMM dd \'yy');
        var dateFormatted = $.format.date(date, 'MMM dd \'yy');
        var today = dateFormatted == now;
        date = (today ? 'Today' : dateFormatted) + ' at ' + $.format.date(date, 'HH:mm');
        return date;
        */
        var date = $.trim(dateStr.replace(/[TZ]/g,' '));
        date = $.format.date(date, 'MMM dd \'yy') + ' at ' + $.format.date(date, 'HH:mm');
        return date;
    },

    fetch: function(options) {
        options || (options = {});
        options.xhrFields = {
          withCredentials: true
        };
        options.cache = false;
        options.dataType = 'xml';
        Backbone.Collection.prototype.fetch.call(this, options);
    }
});