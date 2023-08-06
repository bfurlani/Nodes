module.exports = function (RED) {
    function EventSubsciptionNode(config) {
        RED.nodes.createNode(this, config);
        let serverNode = RED.nodes.getNode(config.server)
        this.tag = config.tag
        this.server = serverNode
        this.host = serverNode.host
        var node = this;
        node.send({ payload: config.tag })
        let io = require('socket.io-client');
        let socket = io.connect(this.host, { reconnect: true });
        this.status({ fill: "yellow", shape: "ring", text: "connecting . . ." });

        // Add a connect listene.eventTagId
        socket.on('connect', function (socket) {
            node.status({ fill: "green", shape: "dot", text: "connected" });
            node.send({ payload: `Connected!` })
        });
        socket.on('disconnect', function (socket) {
            node.status({ fill: "red", shape: "ring", text: "disconnected" });
            node.send({ payload: `disconnected!` })

        })
        socket.on('error', function () {
            node.status({ fill: "red", shape: "ring", text: "disconnected" });
            socket = io.connect(node.host, { reconnect: true });
        });
        socket.on(node.tag, (data) => {
            node.send({ payload: data });
        })
    }
    RED.nodes.registerType("tag-change", EventSubsciptionNode);
}