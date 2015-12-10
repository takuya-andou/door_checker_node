var MilkCocoa = require('milkcocoa');
var milkcocoa = new MilkCocoa('********.mlkcca.com');
var history = milkcocoa.dataStore('door').history();
var execSync = require('child_process').execSync;


var myD = new Date();

var myYear = myD.getFullYear();
var myMonth = myD.getMonth();
var myDate = myD.getDate();
var yesterday = beforeDay(myYear,myMonth,myDate);

if(myD.getHours() >= 19){
	var myYear_start = myYear_end = myYear;
	var myMonth_start= myMonth_end = myMonth;
	var myDate_start = myMonth_end = myDate;
	var myHour_start = 8;
	var myHour_end = 20;
}else{
	var myYear_start = yesterday['year'];
	var myMonth_start= yesterday['month'];
	var myDate_start = yesterday['date'];
	var myYear_end = myYear;
	var myMonth_end = myMonth;
	var myDate_end = myDate;
	var myHour_start = 20;
	var myHour_end = 8;
}

history.sort('desc');
history.size(1);
history.limit(1);
history.span(new Date(myYear_start,myMonth_start,myDate_start,myHour_start,0,0).getTime(), new Date(myYear_end,myMonth_end,myDate_end,myHour_end,0,0).getTime());
history.on('data', function(data) {
	if (data) {
		console.log('data_exists');
		execSync('curl -X POST "https://***.***.***.***/data/UUID" --insecure --header "meshblu_auth_uuid: UUID" --header "meshblu_auth_token: TOKEN"');
		process.exit();
	}else{
		console.log('data_nothing');
		execSync('curl -X POST "https://***.***.***.***/data/UUID" --insecure --header "meshblu_auth_uuid: UUID" --header "meshblu_auth_token: TOKEN"');
		process.exit();
	}
});
history.run();


function beforeDay(year, month, date) {
    var d = new Date(year, month, date);
    d.setDate(d.getDate() - 1);
    return {
        year: d.getFullYear(),
        month: d.getMonth(),
        date: d.getDate()
    };
}