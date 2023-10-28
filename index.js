//Interactive console module
const readline = require('readline');
var RolandChecksum = require('roland-checksum');

// CLI usage

if (require.main === module) { // If called directly
    //Initialize command line interface
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    //Ask for text to be shown
    rl.question('What text do you want to show? ', (answer) => {
        var syxBytes = api(answer); // Use module function to get .syx bytes

        var syx = syxBytes.map(x => x.toString(16).toUpperCase()).join(" "); // Convert .syx bytes to .syx hex string

        rl.write(syx); // Write .syx contents to command line
        rl.close(); // Close interface
    });
}

// Module usage

/**
 * Converts text to .syx file
 * @param {String} text Text to convert
 * @returns {Number[]} Result .syx hex numbers
 */
function api(text) {
    /*
     * Message start
     * F0 - Start of sysex message
     * 41 - Roland manufacturer ID
     * 10 - device ID
     * 16 - model ID
     * 12 - command ID
     * 20 00 00 - command (indicating that we want to display something on the screen)
     */
    var syx = [0xF0, 0x41, 0x10, 0x16, 0x12, 0x20, 0x00, 0x00];
    // For each letter in input (until 20th character)
    for (var i = 0, len = text.length; i < len && i < 20; i++){
        syx.push(text.charCodeAt(i)); // Add hex code (ASCII) to .syx contents
    }
    syx.push(RolandChecksum(syx.slice(5))); // Checksum should not include the first 5 bytes of the command.
    syx.push(0xF7); // Add end of sysex-message byte
    return syx;
}

module.exports = api;