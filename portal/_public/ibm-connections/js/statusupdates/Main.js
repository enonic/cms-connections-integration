(function () {
    if (!window.connections) {
        window.connections = {};
    }

    window.connections.statusupdates = {};
    window.connections.statusupdates.view = {};
    window.connections.statusupdates.model = {};

    /**
     * Get the user's profile document in order to get the profile key
     * This works when Connections is set up to not hide the email
     */
    $(document).ready(function () {
        $.ajax({
            url: window.connections.properties.profileDocumentUrl + '?email=' + window.connections.properties.userEmail,
            type: 'GET',
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                var profileKey = $(data).find('.x-profile-key').text(); // Hack to get the profile key
                window.connections.properties.profileKey = profileKey;

                new connections.statusupdates.view.Main();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                throw('Error getting profile document : ' + errorThrown);
            }
        });

    });

})();