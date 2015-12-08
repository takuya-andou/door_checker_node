var fs = require('fs');

var MilkCocoa = require('milkcocoa');
var milkcocoa = new MilkCocoa('*******.mlkcca.com');
var ds = milkcocoa.dataStore('door');

fs.writeFileSync('/sys/class/gpio/export', 21);
fs.writeFileSync('/sys/class/gpio/gpio21/direction', 'in');

var pre_value = 1;
loop();
function loop() {
    var value = parseInt(fs.readFileSync('/sys/class/gpio/gpio21/value', 'ascii'));
    if ( value != pre_value  ) {
        console.log(value);
        ds.push({DoorOpenFlag:value});
        pre_value = value;
    }
     setTimeout(loop, 1000/10);
}
