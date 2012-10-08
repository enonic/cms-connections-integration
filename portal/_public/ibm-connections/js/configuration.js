(function () {

    var CONNECTIONS_SERVER_ADDRESS = '<connections-server-address>';

    if (!window.connections) {
        window.connections = {};
    }

    window.connections.properties =
    {
        userEmail           : null, // This should contain the email address for the logged in portal user. Leave this as null as it will be set by the portlet XSL.
        profileDocumentUrl  : CONNECTIONS_SERVER_ADDRESS + '/profiles/atom/profile.do',
        profileSearchUrl    : CONNECTIONS_SERVER_ADDRESS + '/profiles/atom/search.do',
        profilePhotoUrl     : CONNECTIONS_SERVER_ADDRESS + '/profiles/photo.do',
        boardEntriesUrl     : CONNECTIONS_SERVER_ADDRESS + '/profiles/atom/mv/theboard/entries/all.do?comments=all&ps=30',
        boardPostUrl        : CONNECTIONS_SERVER_ADDRESS + '/profiles/atom/mv/theboard/entries.do',
    };

})();