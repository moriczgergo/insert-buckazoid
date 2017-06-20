//Interactive console module
const readline = require('readline');

//Initialize command line interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Ask for text to be shown
rl.question('What text do you want to show? ', (answer) => {
    /*
     * Message start
     * F0 - Start of sysex message
     * 41 - Roland manufacturer ID
     * 10 - device ID
     * 16 - model ID
     * 12 - command ID
     * 20 00 00 - command (indicating that we want to display something on the screen)
     */
    var syx = "F0 41 10 16 12 20 00 00 ";
    //Array of values to be used in checksum calculation
    var hexs = ["20", "00", "00"];
    //For each letter in input (until 20th character)
    for (var i = 0, len = answer.length; i < len && i < 20; i++){
        //Add hex code (ASCII) to .syx contents
        syx += answer[i].toString().charCodeAt(0).toString(16) + " ";
        //Push hex code to array
        hexs.push(answer[i].toString().charCodeAt(0).toString(16))
    }
    var checksum = 0;
    //For each hex value saved in the array
    // ---- CHECKSUM CALCULATION ----
    hexs.forEach(function(element){
        //Add value of each hex number to checksum variable
        checksum += parseInt(element, 16);
    });
    //Checksum mod 128 (same as subtracting 128 from checksum everytime it went over 127)
    checksum = checksum % 128;
    //Subtract remainder from 128
    checksum = 128 - checksum;
    // Checksum is done!
    //Add checksum and end of sysex-message byte to .syx contents
    syx += checksum.toString(16) + " F7"
    //Write .syx contents to command line
    rl.write(syx);
    //Close interface
    rl.close();
});