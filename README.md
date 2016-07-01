# ixIRC

This is a node module for [ixIRC](https://ixirc.com/) that is using [their API](https://ixirc.com/?l=api). It can be used in two ways. Both as a standalone cli or through module inclusion in your own module. 

## Installation

If you are using the module as cli you probably want to install it globally, otherwise locally.

```[sudo] npm install [-g] domolicious/ixirc```

## Usage

### CLI 

```ixirq -q <linux+ubuntu> -c <channel id>```

### Module

```
var ixIRC = require("ixirc");

var client = new ixIRC();
var search = client.search({ q: "linux+ubuntu", cid: 92 });

search.then(function(data)
{
	data.results.forEach(function(result)
 	{
 		console.log(result.name);
 	});
});
```
