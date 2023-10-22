module.exports = function(RED) {

    var request = require('request');
    var j = request.jar();
    var request = request.defaults({jar:j});

    function YoulessNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        const loginPath = '/L?w=';

        node.password = config.password;
        node.topic = config.topic;
        node.page = config.page;
        node.ipaddress = config.ipaddress;

        node.on('input', function(msg) {

            var statusUrl = "http://" + node.ipaddress + node.page;
            var loginUrl = "http://" + node.ipaddress + loginPath + node.password; 
            if (!node.topic.endsWith("/")) {
                node.topic = node.topic + "/";
            }; 

            request({
                    uri: loginUrl,
                    method: 'GET',
                    json:true
                }, function () { 
                    request({
                        uri: statusUrl,
                        method: 'GET',
                        json:true
                    }, function (error, response, body) {
                        if (!error && response.statusCode === 200) {
                            if (Array.isArray(body)) {
                            for (var i = 0; i < body.length; i++) {
                            var obj = body[i];
                            for (var key in obj) {
                            var msg = {};
                            msg.topic = key;
                            msg.payload = obj[key];
                            node.send(msg);
                        }
                    }
        }
                        else if (response) {
                            if (response.statusCode === 403) {
                                node.error("Unauthorized request, did you set a (correct) password?");
                            }
                            else {
                                node.error("Request failed with status code: " + response.statusCode);
                            }
                        }
                        else {
                            node.error("Request error: " + error );
                        }
                });
        });
    }
    
    RED.nodes.registerType("youless",YoulessNode, {
        credentials: {
            password: {type:"password"}
        }
    });
    
}
