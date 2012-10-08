window.connections.statusupdates.view.List = Backbone.View.extend({
    initialize: function () {
        var self = this;
        self.collection = new connections.statusupdates.model.MessageCollection();
        self.render();

        $(window).on('connections:statusupdates:postsuccess connections:statusupdates:commentsuccess', function () {
            self.render();
        });
    },

    render: function () {
        var self = this;
        self.collection.fetch({
            success: function (data) {
                var source = $('#ibm-conn-tpl-status-list').html(),
                    template = Handlebars.compile(source);

                self.$el.html(template({statusMessages: self.collection.toJSON()}));
                self.postRender();
            },
            error: function () {
                throw new Error('Message collection fetch error');
            }
        });

    },

    postRender: function () {
        var self = this;

        // Handle add comment buttons
        $('.ibm-conn-status-item').on('click', 'a.ibm-conn-status-add-comment', function (event) {
            var $addCommentbutton = $(this),
                $commentBox = $addCommentbutton.next('div');

            $commentBox.toggle();
        });

        // Handle cancel comment buttons
        $('.ibm-conn-status-item').on('click', 'a.ibm-conn-status-comment-cancel', function (event) {
            var $cancelButton = $(this),
                $commentBox = $cancelButton.parent();

            $commentBox.toggle();
        });

        // Handle submit comment buttons
        $('.ibm-conn-status-item').on('click', 'a.ibm-conn-status-comment-submit', function (event) {
            var $submitButton = $(this),
                $commentTextArea = $submitButton.prevAll('textarea'),
                replyUrl = $submitButton.attr('rel'),
                commentXml = self.createCommentXmlData($commentTextArea.val());

            if ($.trim($commentTextArea.val()).length > 0) {
                self.postComment(replyUrl, commentXml);
            }
        });

        // Add IBM business card 
        if (typeof SemTagSvc.parseDom === 'function') {
            self.$el.find('.ibm-conn-profile-business-card').each(function (i) {
                SemTagSvc.parseDom(null, $(this)[0]);
            });
        }

    },

    postComment: function (replyUrl, commentXml) {
        $.ajax({
            url: replyUrl,
            type: 'POST',
            contentType: 'text/plain; charset=UTF-8',
            data: commentXml,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                $(window).trigger('connections:statusupdates:commentsuccess');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                throw new Error('Post comment error: ' + errorThrown);
            }
        });
    },

    createCommentXmlData: function (commentText) {
        var xmlStr = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
        xmlStr += "<entry xmlns=\"http://www.w3.org/2005/Atom\">";
        xmlStr += "<category scheme=\"http://www.ibm.com/xmlns/prod/sn/type\" term=\"comment\"/>";
        xmlStr += "<category scheme=\"http://www.ibm.com/xmlns/prod/sn/message-type\" term=\"simpleComment\" />";
        xmlStr += "<content type=\"text\">";
        xmlStr += $.trim(commentText);
        xmlStr += "</content>";
        xmlStr += "</entry>";
        return xmlStr;
    }

});