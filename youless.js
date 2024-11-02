module.exports = function(RED) {

    var request = require('request');
    var j = request.jar();
    var request = request.defaults({jar:j});

    function YoulessNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        const loginPath = '/L?w=';
        const statusPaths = ['/e?f=j/', '/f?f=j/'];

        node.password = config.password;
        node.topic = config.topic;
        node.ipaddress = config.ipaddress;

        node.on('input', function(msg) {
            var loginUrl = "http://" + node.ipaddress + loginPath + node.password; 

            // Ensure the topic ends with a slash
            if (!node.topic.endsWith("/")) {
                node.topic = node.topic + "/";
            }

            // Login to the Youless API
            request({
                uri: loginUrl,
                method: 'GET',
                json: true
            }, function() {
                // Loop through each statusPath
                statusPaths.forEach(function(statusPath) {
                    var statusUrl = "http://" + node.ipaddress + statusPath;

                    request({
                        uri: statusUrl,
                        method: 'GET',
                        json: true
                    }, function(error, response, body) {
                        if (!error && response.statusCode === 200) {
                            let p1 = null, p2 = null, n1 = null, n2 = null;

                            if (statusPath === '/e?f=j/') {
                                // Handle the array of objects for /e?f=j/
                                body.forEach(function(item) {
                                    // Loop through each property of the item
                                    for (var key in item) {
                                        msg = {};
                                        msg.topic = key;  // Use the property name as topic
                                        msg.payload = convertToNumber(item[key]); // Convert value to number
                                        msg.fromPath = statusPath; // Indicate the source path
                                        msg.unit = getUnitOfMeasurement(key); // Get the unit for each topic
                                        node.send(msg);

                                        // Save values for p1, p2, n1, n2
                                        if (key === 'p1') p1 = msg.payload;
                                        if (key === 'p2') p2 = msg.payload;
                                        if (key === 'n1') n1 = msg.payload;
                                        if (key === 'n2') n2 = msg.payload;
                                    }
                                });
                            } else {
                                // Handle other status pages (object responses)
                                for (var key in body) {
                                    msg = {};
                                    msg.topic = key;
                                    msg.payload = convertToNumber(body[key]); // Convert value to number
                                    msg.fromPath = statusPath; // Indicate the source path
                                    msg.unit = getUnitOfMeasurement(key); // Get the unit for each topic
                                    node.send(msg);

                                    // Save values for p1, p2, n1, n2
                                    if (key === 'p1') p1 = msg.payload;
                                    if (key === 'p2') p2 = msg.payload;
                                    if (key === 'n1') n1 = msg.payload;
                                    if (key === 'n2') n2 = msg.payload;
                                }
                            }

                            // Check if p1 and p2 are defined and not zero
                            if (p1 !== null && p2 !== null && p1 !== 0 && p2 !== 0) {
                                msg = {};
                                msg.topic = 'p0';
                                msg.payload = p1 + p2; // Sum p1 and p2
                                msg.fromPath = statusPath; // Indicate the source path
                                msg.unit = 'W'; // Assuming the unit is Watts
                                node.send(msg);
                            }

                            // Check if n1 and n2 are defined and not zero
                            if (n1 !== null && n2 !== null && n1 !== 0 && n2 !== 0) {
                                msg = {};
                                msg.topic = 'n0';
                                msg.payload = n1 + n2; // Sum n1 and n2
                                msg.fromPath = statusPath; // Indicate the source path
                                msg.unit = 'W'; // Assuming the unit is Watts
                                node.send(msg);
                            }
                        } else if (response) {
                            node.error(`Request failed with status code: ${response.statusCode}. Error: ${error}`);
                        } else {
                            node.error("Request error: " + error);
                        }
                    });
                });
            });
        });
    }

    // Helper function to convert values to numbers
    function convertToNumber(value) {
        // Check if the value is actually a string before trimming and replacing
        if (typeof value === 'string') {
            // Trim whitespace and replace comma with dot
            value = value.trim().replace(',', '.');
            // Attempt to convert the value to a number
            let numericValue = Number(value);
            // Check if the conversion resulted in NaN, if so return the original value
            return isNaN(numericValue) ? value : numericValue; 
        } else {
            // If the value is not a string, just return it directly
            return value;
        }
    }

    // Helper function to get unit of measurement based on topic
    function getUnitOfMeasurement(topic) {
        switch (topic) {
            case 'net':
            case 'p0':    
            case 'p1':
            case 'n0':
            case 'p2':
            case 'n1':
            case 'n2':
            case 'cs0':
                return 'kWh'; // kilo Watts hour
            case 'i1':
            case 'i2':
            case 'i3':
                return 'A'; // Ampere    
            case 'v1':
            case 'v2':
            case 'v3':
                return 'V'; // Voltage    
            case 'l1':
            case 'l2':
            case 'l3':
            case 'pwr':
            case 'ps0':
                return 'W'; // Watts for power
            case 'gas':
            case 'wtr':
                return 'm³'; // Cubic meters for gas and water
            default:
                return ''; // No unit defined
        }
    }

    RED.nodes.registerType("youless", YoulessNode, {
        credentials: {
            password: { type: "password" }
        }
    });
}
