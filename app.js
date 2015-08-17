//"http://ojp.nationalrail.co.uk/service/timesandfares/CTR/SDB/today/1930/dep"
/* global process */
var open = require("open"),
	format = require("util").format,
	moment = require("moment");

var url = "http://ojp.nationalrail.co.uk/service/timesandfares/%s/%s/today/%s/dep",
	from = process.argv[2],
	to = process.argv[3],
	now = process.argv[4] ? moment(process.argv[4], "HHmm") : moment(),
	time = now.format("HHmm");

open(format(url, from, to, time));