const http = require('http');
const tags = require('./tags.js');
module.exports = function (RED) {
    function TagWriteNode(config) {
        RED.nodes.createNode(this, config);
        let serverNode = RED.nodes.getNode(config.server)
        this.tag = config.tag
        this.server = serverNode.host
        this.host = serverNode.host
        this.token = serverNode.accessToken
        this.status({ fill: "yellow", shape: "ring", text: "connecting . . ." });
        tags.checkAPIConnection(this.host).then((res) => {
            if (res === true) {
                this.status({ fill: "green", shape: "dot", text: "connected" });
            } else {
                this.status({ fill: "red", shape: "ring", text: "disconnected" });
            }
        })

        var node = this;
        node.on('input', function (msg) {
            try {
                this.value = msg.payload
                tags.updateTag(this)
                msg.payload = { "id": this.tag, "value": this.value, "server": serverNode }

            }
            catch (e) {
                msg.payload = e.message
            }
            //msg.payload = JSON.stringify(this) + "\n" + JSON.stringify(config)
            node.send(msg);
        });
    }
    RED.nodes.registerType("tag-write", TagWriteNode);
}