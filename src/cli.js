#!/usr/bin/env node

const cliff = require("cliff");
const minimist = require("minimist")(process.argv.slice(2));
const ixIRC = require("./ixirc");
const fs = require("fs");

(async function()
{
	if(!minimist.q || minimist.h || minimist.help)
	{
		print_help();
		return;
	}

	let args = {
		chan: minimist.c ? minimist.c : 92,
		q: minimist.q
	};

	let client = new ixIRC();

	try
	{
		let result = await client.search(args);
		if(result.results)
		{
			print_result(result);
			save_result(result);
		}
		else
		{
			console.log("No results");
		}
	}
	catch(e)
	{
		console.error(`Unable to search: ${e}`);
	}
})();

function print_result(data)
{
	let lines = [];

	lines.push(["#", "Name", "Network", "Channel", "User", "Pack", "Gets" ,"Size", "Posted", "Last Activity"]);

	let i = 0;
	for(let result of data.results)
	{
		lines.push([i, result.name, result.naddr, result.cname, result.uname, result.n, result.gets, result.szf, result.agef, result.lastf]);
		i++;
	}

	console.log(cliff.stringifyRows(lines));
}

function print_help()
{
	let lines = [];

	lines.push(["USAGE", "ixirq -q <query> [-c <channel id>]", "(default: -c 92)"]);
	lines.push(["NOTE", "use the plus (+) sign instead of space"]);
	lines.push(["EXAMPLE", "ixirc -q family+guy+s01e01+720p -c 105"]);

	console.log("");
	console.log(cliff.stringifyRows(lines));
	console.log("");
}

function save_result(data)
{
	fs.writeFile("/tmp/ixirc_result.json", JSON.stringify(data), (err) => {
		if(err) throw err;
	});
}
