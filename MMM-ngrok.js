/* global Log, Module, moment */

/* Magic Mirror
 * Module: Compliments
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */
Module.register("MMM-ngrok", {

	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},

	// Define start sequence.
	start: function() {
		this.sendSocketNotification("CONNECT", {max: 5});
		Log.info("Starting module: " + this.name);

		var self = this;

		self.updateDom(self.config.fadeSpeed);
	},


	socketNotificationReceived: function(notification, payload) {
		if(notification === "NEW_MESSAGE"){
			this.message = payload['message']
			console.log("message received")
			this.updateDom(this.config.fadeSpeed);
		}
	 },
	// Override dom generator.
	getDom: function() {

		var wrapper = document.createElement("div");
		wrapper.className = this.config.classes ? this.config.classes : "light small dimmed";

		if (typeof this.message !== 'undefined') {
			// get the compliment text
			var finalText = this.message;

			// split it into parts on newline text
			var parts = finalText.split("\n");
			// create a span to hold it all
			var compliment = document.createElement("span");
			// process all the parts of the compliment text
			for (part of parts) {
				// create a text element for each part
				compliment.appendChild(document.createTextNode(part));
				// add a break `
				compliment.appendChild(document.createElement("BR"));
			}
			// remove the last break
			compliment.lastElementChild.remove();
			wrapper.appendChild(compliment);
		}
		return wrapper;
	},


	// Override notification handler.
	notificationReceived: function(notification, payload, sender) {
	},

});
