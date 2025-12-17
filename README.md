# Fake ChatGPT Interface - Film Prop

A realistic ChatGPT-like interface for film production that runs locally and uses pre-scripted responses.

## Features

- Clean, modern chat interface similar to ChatGPT (no branding)
- Built-in script editor for creating and editing conversation flows
- Realistic typing animations
- Support for thinking indicators, image generation simulation, and user interactions
- Runs completely locally in your browser

## How to Use

### Running the Application

1. Open `index.html` in your web browser (Chrome, Firefox, Safari, etc.)
2. The application will load with an example script pre-loaded

### Opening the Script Editor

- Click the ⚙ (gear) icon in the top-right corner of the chat interface
- The script editor panel will slide in from the left

### Script Commands

All commands are case-insensitive. Available commands:

- **SAY [text]** - Display text as an AI response with typing animation
- **THINK [seconds]** - Show "Thinking..." with a spinner (default: 10s)
- **IMAGINE** - Display a placeholder for image generation
- **IMAGE [path]** - Show an image from the specified path (replaces IMAGINE placeholder if present)
- **WAIT [seconds]** - Pause before continuing (default: 10s)
- **USER** - Wait for user to type and send a message before continuing
- **CLEAR** - Clear all chat messages

### Example Script

```
SAY Hello how can I help you today?
USER
THINK 10
SAY Hmm I don't think I can help you with that as I cannot be used to generate pornographic images. Is there anything else I can help you with?
USER
THINK 10
SAY Let me generate an image of a girl with cat ears and a bikini...
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
```

### Loading a Script

1. Open the script editor (⚙ icon)
2. Edit or paste your script in the text area
3. Click "Load Script" to start the conversation
4. The editor will close and the script will begin executing

### Resetting the Chat

Click the "Reset Chat" button in the script editor to clear all messages and reset the script position.

## Tips for Film Production

- **Timing**: Use THINK and WAIT commands to control pacing during filming
- **Images**: Place your image files in an accessible folder and reference them with absolute or relative paths
- **USER Commands**: Use these to create natural pauses where the actor can type realistic messages
- **CLEAR Command**: Perfect for starting fresh takes without reloading the page

## File Structure

```
index.html    - Main HTML structure
styles.css    - ChatGPT-like styling
script.js     - Script parser and execution engine
README.md     - This file
```

## Technical Notes

- No internet connection required
- No external dependencies
- All processing happens in the browser
- Scripts are stored in memory only (not saved to disk)
