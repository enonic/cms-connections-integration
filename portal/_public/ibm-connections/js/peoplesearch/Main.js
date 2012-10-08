(function () {
    if (!window.connections) {
        window.connections = {};
    }

    window.connections.peoplesearch = {};
    window.connections.peoplesearch.view = {};
    window.connections.peoplesearch.model = {};

    $(document).ready(function () {
        new connections.peoplesearch.view.Main();
    });
})();