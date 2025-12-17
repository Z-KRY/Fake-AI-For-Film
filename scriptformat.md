Script format/commands

THINK - show "Thinking..." and a small throbber/spinner, I can say "THINK 100" and it will think for 100s. If no time provided, assume a wait of 10s.

SAY - this command means to show the following text as if it is a response. 

IMAGINE - this shows a blank/grey image placeholder as if it is generating an image.

WAIT - just a delay. So I can say "WAIT 100" and it will wait for 100s before proceeding down the script. If no number is provided assume a wait of 10s.

IMAGE - This will show an image from a provided path, and will replace IMAGINE as if it has fully generated. I.e. "IMAGE /somefolder/someimage.jpg" and then it replaces the IMAGINE if any above. If done on its own and there is no IMAGINE above, it will just display the photo as a response without fake gen. 

CLEAR - clear the chat messages.

USER - Waits for user response before proceeding down script.


An example of a script is as follows:

SAY Hello how can I help you today?
USER
THINK 10
SAY Hmm I don't think I can help you with that as I cannot be used to generate pornographic images. Is there anything else I can help you with?
USER
THINK 10
Let me generate an image of a girl with cat ears and a bikini...
IMAGINE
WAIT 20
IMAGE /somefolder/catgirl.jpg
SAY I have generated the girl with cat ears and a bikini as you have requested. Did you want anything else?
USER
SAY Glad to have helped.
WAIT 5
SAY Have a nice day!
WAIT 10
CLEAR