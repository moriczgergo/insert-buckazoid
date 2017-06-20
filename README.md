# insert-buckazoid
Node script for writing text to the Roland MT-32's screen.

Ever played Space Quest 3? Insert a buckazoid your own way!

# Usage

Clone this repository, and run the node script.

```
What text do you want to show? 
```

Type the text that should appear on the screen. (up to 20 characters, automatically sliced)

```
What text do you want to show? test
F0 41 10 16 12 20 00 00 74 65 73 74 20 F7
```

# Behind the scenes

Showing text on the Roland MT-32's screen can be achieved with a sysex message.

The example below contains this data:

* `F0` - Start of sysex message
* `41` - Roland's manufacturer ID
* `10` - device ID
* `16` - model ID
* `12` - command ID

Next, we have these three bytes to indicate that we want to display something on the screen:

```
20 00 00
```

* `74 65 73 74` - HEX Code of "test" (ASCII)
* `20` - Checksum
* `F7` - End of sysex message

## Checksum calculation

The checksum calculation took a couple of frustrating hours for me, because I couldn't find information that worked.

These are the bytes that we need to checksum:

* `20 00 00` - Display command
* `74 65 73 74` - HEX Code of "test" (ASCII)

We are going to go ahead and add these together:

`0x20 + 0x00 + 0x00 + 0x74 + 0x65 + 0x73 + 0x74`

To calculate the checksum, first, we need to checksum mod 128.

`checksum % 128`

Finally, we need to subtract the remainder from 128.

`128 - checksum`

There we go! We have our checksum!

# Emulators

If you don't have a Roland MT-32, you can use [Munt](http://munt.sourceforge.net/), a Roland MT-32 Emulator.

You can send .syx signals to the emulator, or to the MT-32 with the [Bome SendSX](http://www.bome.com/products/sendsx). Just copy the hex that this spits out, select your MT-32 in the `Midi Out` dropdown menu, and press the send button.