var LCD = require('lcdi2c');
var sleep = require('sleep');
var lcd = new LCD( 1, 0x27, 20, 4 );

module.exports = function(RED) {
    function LCDNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        lcd.on();
        //lcd.setBacklight(1);
        lcd.clear();
        lcd.home();

        node.on('input', function(msg) {
            // Print and check for errors. If errors found, shut down gently.
            line1 = String((msg.line1 || "") + "                ");
            line2 = String((msg.line2 || "") + "                ");

            lcd.println( line1, 1 );
            if ( lcd.error ) {
                lcdError( lcd.error );
            } else {
                lcd.println( line2, 2 );
                if ( lcd.error ) {
                    lcdError( lcd.error );
                };
            };
            node.send(msg);
        });
    }
    function lcdError( err ) {
        clearInterval( int1 );
        console.log( 'Unable to print to LCD on bus 1 at address 0x27. Error: ' + JSON.stringify( err ) );
    };

    RED.nodes.registerType("qapass-1602-lcd",LCDNode);
}
