/* global Module */

/* Magic Mirror
 * Module: MMM-syslog
 *
 * By Paul-Vincent Roll http://paulvincentroll.com
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
const url = require("url");
const fs = require("fs");

module.exports = NodeHelper.create({

	start: function() {
		this.expressApp.get('/ngrok', (req, res) => {

			var query = url.parse(req.url, true).query;
			var message = query.message;

			var log = {"message": message};
			res.send({"status": "success", "payload": log});
			this.sendSocketNotification("NEW_MESSAGE", log);

		});
	},

	socketNotificationReceived: function(notification, payload) {
		if(notification === "CONNECT"){
			// this.logFile = payload.logFile;
			// this.loadLogs();
			this.max = payload.max;
		}
	},

});