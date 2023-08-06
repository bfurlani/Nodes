module.exports = function (RED) {
    function ForgeServerConfiguration(config) {
        RED.nodes.createNode(this, config);
        this.host = config.host
        this.accessToken = config.accesstoken

    }
    RED.nodes.registerType("forge-server", ForgeServerConfiguration);
}