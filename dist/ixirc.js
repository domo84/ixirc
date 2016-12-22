"use strict";

const http = require("http");

let defaults = {
	host: "ixirc.com",
	channel_id: 92
};

class ixIRC {
	search(args) {
		if (args == null) {
			throw "Missing Args parameter";
		}

		if (args.q == null) {
			throw "Missing Query parameter";
		}

		if (args.cid == null) {
			args.cid = defaults.channel_id;
		}

		let path = `/api/?q=${ args.q }&cid=${ args.cid }`;

		let options = {
			host: defaults.host,
			path: path
		};

		return new Promise((resolve, reject) => {
			http.get(options, res => {
				let data = "";
				res.on("data", chunk => {
					data += chunk;
				});

				res.on("end", () => {
					resolve(JSON.parse(data));
				});
			});
		});
	}
}

module.exports = ixIRC;