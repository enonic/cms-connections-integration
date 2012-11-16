window.connections.statusupdates.view.Form = Backbone.View.extend({
    initialize: function () {
        var properties = window.connections.properties;

        this.render();
        this.textarea = this.$el.find('textarea.ibm-conn-status-message-textarea');
        this.url = properties.boardPostUrl + '?key=' + properties.profileKey;
    },                                             

    render: function () {
        var source = $('#ibm-conn-tpl-status-form').html(),
            template = Handlebars.compile(source);

        this.$el.html(template, {});
    },

    events: {
        'click input[type=button]': 'handleButtonClick'
    },

    handleButtonClick: function (event) {
        if ($.trim(this.textarea.val()).length > 0) {
            this.post();
        }
        this.textarea.val('').focus();
    },

    post: function () {
        var self = this,
            xmlData = self.createEntryPostXmlData();

        $.ajax({
            url: self.url,
            type: 'POST',
            contentType: 'text/plain; charset=UTF-8',
            data: xmlData,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                $(window).trigger('connections:statusupdates:postsuccess');
            },
            error: function  (jqXHR, textStatus, errorThrown) {
                throw new Error('Post status message error: ' + errorThrown);
            }
        });
    },

    createEntryPostXmlData: function() {
        var xmlStr = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
        xmlStr += "<entry xmlns=\"http://www.w3.org/2005/Atom\">";
        xmlStr += "<category scheme=\"http://www.ibm.com/xmlns/prod/sn/type\" term=\"entry\"/>";
        xmlStr += "<category scheme=\"http://www.ibm.com/xmlns/prod/sn/message-type\" term=\"simpleEntry\"/>";
        xmlStr += "<content type=\"text\">";
        xmlStr += this.textarea.val();
        xmlStr += "</content>";
        xmlStr += "</entry>"; 
        return xmlStr;
    }

});