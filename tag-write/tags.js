const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


const updateTag = (node) => {
    let { host, tag, value, token } = node
    var raw = JSON.stringify({
        id: tag,
        value: value,
        token: token
    });

    var requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: raw,
    };
    node.status({ fill: "yellow", shape: "ring", text: "writting . . ." });
    fetch(`${host}/api/public/Tag`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.length !== 0) {
                node.status({ fill: "red", shape: "ring", text: "bad write" });
            } else {
                node.status({ fill: "green", shape: "dot", text: "valid write" });
                return result
            }
        })
        .catch(error => node.status({ fill: "red", shape: "ring", text: "bad write" }));
};
const checkAPIConnection = async (server) => {


    var requestOptions = {
        method: 'GET',
    };

    return await fetch(`${server}/api/GetInit`, requestOptions)
        .then(response => response.json())
        .catch(error => undefined);
};


module.exports = {
    updateTag,
    checkAPIConnection
}