const jsxl = require('jsxl');
jsxl.useFilters({
	IP: { 
        $type: String, 
        $match: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        $message: '%s must be a well-formed IP-address (0-255.0-255.0-255.0-255)'
    }
});
jsxl(
	{
		input: '127.1.1.1'
	},
	"IP",
	(err, output) => {
	console.log(output);
	
});