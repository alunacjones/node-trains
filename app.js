//"http://ojp.nationalrail.co.uk/service/timesandfares/CTR/SDB/today/1930/dep"
// new: https://www.nationalrail.co.uk/journey-planner/?type=single&origin=CTR&destination=ALT&leavingType=departing&leavingDate=090524&leavingHour=07&leavingMin=15&adults=1&extraTime=0#O
/* global process */
var open = require("open"),
	format = require("util").format,
	moment = require("moment");

var url = "http://ojp.nationalrail.co.uk/service/timesandfares/%s/%s/%s/%s/dep",
	arriveOrDepartUrl = "https://www.nationalrail.co.uk/live-trains/%s/%s/",
	dateMatchers = [
		{
			regex: /mon|tue|wed|thu|fri|sat|sun/i,
			transformer: function(value) {
				var indexOfDay = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(value.toLowerCase());
				return moment().day(indexOfDay + (indexOfDay < moment().day() ? 7 : 0))
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

		return dateMatchers.find(function(dateMatcher) {
			return !!dateMatcher.regex.exec(value);
		}).transformer(value);
	},
	from = process.argv[2];

if (from[0] === "-") {
	open(format(arriveOrDepartUrl, from == "-arr" ? "arrivals" : "departures", process.argv[3]));
}
else {
	var to = process.argv[3],
		now = process.argv[4] ? moment(process.argv[4], "HHmm") : moment(),
		time = now.format("HHmm"),
		day = process.argv[5] ? dateTransform(process.argv[5]) : "today";

	open(format(url, from, to, day, time));
}
