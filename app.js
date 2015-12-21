//"http://ojp.nationalrail.co.uk/service/timesandfares/CTR/SDB/today/1930/dep"
/* global process */
var open = require("open"),
	format = require("util").format,
	moment = require("moment");

var url = "http://ojp.nationalrail.co.uk/service/timesandfares/%s/%s/%s/%s/dep",
	dateMatchers = [
		{
			regex: /mon|tue|wed|thu|fri|sat|sun/i,
			transformer: function(value) {
				return moment().day(["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(value.toLowerCase()))
                    .format("DDMMYY");
			}
		},	
		{
			regex: /\d{4}-\d{2}-\d{2}/,
			transformer: function(value) {
				return moment(value, ["YYYY-MM-DD"]).format("DDMMYY");
			}
		},		
		{
			regex: /.*/,
			transformer: function(value) {
				return value;
			}
		}
	],
	dateTransform = function(value) {

		return dateMatchers.filter(function(dateMatcher) {
			return !!dateMatcher.regex.exec(value);
		})[0].transformer(value);
	},
	from = process.argv[2],
	to = process.argv[3],
	now = process.argv[4] ? moment(process.argv[4], "HHmm") : moment(),
	time = now.format("HHmm"),
	day = process.argv[5] ? dateTransform(process.argv[5]) : "today";

open(format(url, from, to, day, time));