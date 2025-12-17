class ChatApp {
    constructor() {
        this.scriptLines = [];
        this.currentLine = 0;
        this.isExecuting = false;
        this.waitingForUser = false;
        this.currentImagePlaceholder = null;
        this.hourglassSVG = this.getHourglassSVG();
        this.autoScroll = true;
        this.smoothScroll = false;
        this.scrollSpeed = 5; // 1-10 scale
        this.isScrolling = false;

        this.initElements();
        this.attachEventListeners();
        this.loadExampleScript();
    }

    getHourglassSVG() {
        return `<svg class="hourglass-spinner" viewBox="0 0 300 300">
  <!-- background -->
  <circle cx="150" cy="150" r="130" style="stroke: #565869; stroke-width:18; fill:transparent"/>
  <circle cx="150" cy="150" r="115" style="fill:#343541"/>
  <path style="stroke: #343541; stroke-dasharray:820; stroke-dashoffset:820; stroke-width:18; fill:transparent" d="M150,150 m0,-130 a 130,130 0 0,1 0,260 a 130,130 0 0,1 0,-260">
    <animate attributeName="stroke-dashoffset" dur="6s" to="-820" repeatCount="indefinite"/>
  </path>

  <!-- image -->
  <path id="hourglass" d="M150,150 C60,85 240,85 150,150 C60,215 240,215 150,150 Z" style="stroke: #ececf1; stroke-width:5; fill:#ececf1;" />

  <path id="frame" d="M100,97 L200, 97 M100,203 L200,203 M110,97 L110,142 M110,158 L110,200 M190,97 L190,142 M190,158 L190,200 M110,150 L110,150 M190,150 L190,150" style="stroke:#10a37f; stroke-width:6; stroke-linecap:round" />

  <animateTransform xlink:href="#frame" attributeName="transform" type="rotate" begin="0s" dur="3s" values="0 150 150; 0 150 150; 180 150 150" keyTimes="0; 0.8; 1" repeatCount="indefinite" />
  <animateTransform xlink:href="#hourglass" attributeName="transform" type="rotate" begin="0s" dur="3s" values="0 150 150; 0 150 150; 180 150 150" keyTimes="0; 0.8; 1" repeatCount="indefinite" />

  <!-- sand -->
  <!-- upper part -->
  <polygon id="upper" points="120,125 180,125 150,147" style="fill:#343541;">
    <animate attributeName="points" dur="3s" keyTimes="0; 0.8; 1" values="120,125 180,125 150,147; 150,150 150,150 150,150; 150,150 150,150 150,150" repeatCount="indefinite"/>
  </polygon>

  <!-- falling sand -->
  <path id="line" stroke-linecap="round" stroke-dasharray="1,4" stroke-dashoffset="200.00" stroke="#343541" stroke-width="2" d="M150,150 L150,198">
    <animate attributeName="stroke-dashoffset" dur="3s" to="1.00" repeatCount="indefinite"/>
    <animate attributeName="d" dur="3s" to="M150,195 L150,195" values="M150,150 L150,198; M150,150 L150,198; M150,198 L150,198; M150,195 L150,195" keyTimes="0; 0.65; 0.9; 1" repeatCount="indefinite"/>
    <animate attributeName="stroke" dur="3s" keyTimes="0; 0.65; 0.8; 1" values="#343541;#343541;transparent;transparent" to="transparent" repeatCount="indefinite"/>
  </path>

  <!-- lower part -->
  <g id="lower">
    <path d="M150,180 L180,190 A28,10 0 1,1 120,190 L150,180 Z" style="stroke: transparent; stroke-width:5; fill:#343541;">
      <animateTransform attributeName="transform" type="translate" keyTimes="0; 0.65; 1" values="0 15; 0 0; 0 0" dur="3s" repeatCount="indefinite" />
    </path>
    <animateTransform xlink:href="#lower" attributeName="transform" type="rotate" begin="0s" dur="3s" values="0 150 150; 0 150 150; 180 150 150" keyTimes="0; 0.8; 1" repeatCount="indefinite"/>
  </g>

  <!-- lower overlay - hourglass -->
  <path d="M150,150 C60,85 240,85 150,150 C60,215 240,215 150,150 Z" style="stroke: #ececf1; stroke-width:5; fill:transparent;">
    <animateTransform attributeName="transform" type="rotate" begin="0s" dur="3s" values="0 150 150; 0 150 150; 180 150 150" keyTimes="0; 0.8; 1" repeatCount="indefinite"/>
  </path>

  <!-- lower overlay - frame -->
  <path id="frame2" d="M100,97 L200, 97 M100,203 L200,203" style="stroke:#10a37f; stroke-width:6; stroke-linecap:round">
    <animateTransform attributeName="transform" type="rotate" begin="0s" dur="3s" values="0 150 150; 0 150 150; 180 150 150" keyTimes="0; 0.8; 1" repeatCount="indefinite"/>
  </path>
</svg>`;
    }

    initElements() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.scriptEditor = document.getElementById('scriptEditor');
        this.scriptInput = document.getElementById('scriptInput');
        this.toggleEditorBtn = document.getElementById('toggleEditor');
        this.closeEditorBtn = document.getElementById('closeEditor');
        this.loadScriptBtn = document.getElementById('loadScript');
        this.resetChatBtn = document.getElementById('resetChat');
        this.autoScrollToggle = document.getElementById('autoScrollToggle');
        this.smoothScrollToggle = document.getElementById('smoothScrollToggle');
        this.scrollSpeedSlider = document.getElementById('scrollSpeedSlider');
    }

    attachEventListeners() {
        this.sendBtn.addEventListener('click', () => this.handleUserMessage());
        this.userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleUserMessage();
            }
        });

        this.toggleEditorBtn.addEventListener('click', () => this.toggleEditor());
        this.closeEditorBtn.addEventListener('click', () => this.toggleEditor());
        this.loadScriptBtn.addEventListener('click', () => this.loadScript());
        this.resetChatBtn.addEventListener('click', () => this.resetChat());
        this.autoScrollToggle.addEventListener('change', (e) => {
            this.autoScroll = e.target.checked;
        });
        this.smoothScrollToggle.addEventListener('change', (e) => {
            this.smoothScroll = e.target.checked;
        });
        this.scrollSpeedSlider.addEventListener('input', (e) => {
            this.scrollSpeed = parseInt(e.target.value);
        });

        // Auto-resize textarea
        this.userInput.addEventListener('input', () => {
            this.userInput.style.height = 'auto';
            this.userInput.style.height = this.userInput.scrollHeight + 'px';
        });
    }

    toggleEditor() {
        this.scriptEditor.classList.toggle('hidden');
    }

    loadExampleScript() {
        const exampleScript = `SAY Hello how can I help you today?
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
CLEAR`;
        this.scriptInput.value = exampleScript;
    }

    loadScript() {
        const scriptText = this.scriptInput.value;
        this.scriptLines = scriptText.split('\n').filter(line => line.trim() !== '');
        this.currentLine = 0;
        this.isExecuting = false;
        this.waitingForUser = false;
        this.resetChat();
        this.executeScript();
        this.toggleEditor();
    }

    resetChat() {
        this.chatMessages.innerHTML = '';
        this.currentLine = 0;
        this.isExecuting = false;
        this.waitingForUser = false;
        this.currentImagePlaceholder = null;
        this.disableUserInput();
    }

    async executeScript() {
        if (this.isExecuting || this.currentLine >= this.scriptLines.length) {
            return;
        }

        this.isExecuting = true;

        while (this.currentLine < this.scriptLines.length && !this.waitingForUser) {
            const line = this.scriptLines[this.currentLine].trim();
            this.currentLine++;

            if (!line) continue;

            const [command, ...args] = line.split(' ');
            const argument = args.join(' ').trim();

            try {
                await this.executeCommand(command.toUpperCase(), argument);
            } catch (error) {
                console.error('Error executing command:', error);
            }
        }

        this.isExecuting = false;
    }

    async executeCommand(command, argument) {
        switch (command) {
            case 'SAY':
                await this.commandSay(argument);
                break;
            case 'THINK':
                await this.commandThink(argument);
                break;
            case 'IMAGINE':
                await this.commandImagine();
                break;
            case 'IMAGE':
                await this.commandImage(argument);
                break;
            case 'WAIT':
                await this.commandWait(argument);
                break;
            case 'USER':
                await this.commandUser();
                break;
            case 'CLEAR':
                await this.commandClear();
                break;
            default:
                console.warn('Unknown command:', command);
        }
    }

    async commandSay(text) {
        const messageDiv = this.createMessage('assistant', text);
        await this.typeMessage(messageDiv.querySelector('.message-text'), text);
    }

    async commandThink(duration) {
        const seconds = parseInt(duration) || 10;
        const messageDiv = this.createMessage('assistant', '', true);
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'thinking';
        thinkingDiv.innerHTML = this.hourglassSVG + '<span>Thinking...</span>';
        messageDiv.querySelector('.message-content').appendChild(thinkingDiv);

        await this.sleep(seconds * 1000);
        messageDiv.remove();
    }

    async commandImagine() {
        const messageDiv = this.createMessage('assistant', '', true);
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.innerHTML = this.hourglassSVG + '<span>Generating image...</span>';
        messageDiv.querySelector('.message-content').appendChild(placeholder);
        this.currentImagePlaceholder = placeholder;
    }

    async commandImage(path) {
        if (this.currentImagePlaceholder) {
            // Replace the placeholder with blur-to-unblur effect
            const wrapper = document.createElement('div');
            wrapper.className = 'image-wrapper';

            const imgBlurred = document.createElement('img');
            imgBlurred.className = 'message-image-blurred';
            imgBlurred.src = path;
            imgBlurred.alt = 'Generated image';
            imgBlurred.style.filter = 'blur(50px)';

            const imgSharp = document.createElement('img');
            imgSharp.className = 'message-image-sharp';
            imgSharp.src = path;
            imgSharp.alt = 'Generated image';
            imgSharp.style.clipPath = 'inset(0 0 100% 0)'; // Start with bottom clipped (only top visible)

            wrapper.appendChild(imgBlurred);
            wrapper.appendChild(imgSharp);

            const placeholder = this.currentImagePlaceholder;
            this.currentImagePlaceholder = null;

            imgBlurred.onload = async () => {
                // Replace placeholder with wrapper containing both images
                placeholder.replaceWith(wrapper);

                // Wait a brief moment, then start unblurring from top to bottom
                await this.sleep(100);

                // Animate the sharp image revealing with realistic AI-style progression
                // Random jumps and varying speeds to mimic real AI image generation
                const revealSteps = [
                    { clip: 'inset(0 0 95% 0)', duration: 200 },   // Quick jump to 5%
                    { clip: 'inset(0 0 88% 0)', duration: 150 },   // Another jump
                    { clip: 'inset(0 0 82% 0)', duration: 300 },   // Slower
                    { clip: 'inset(0 0 70% 0)', duration: 100 },   // Quick jump
                    { clip: 'inset(0 0 65% 0)', duration: 400 },   // Slow down
                    { clip: 'inset(0 0 58% 0)', duration: 250 },   // Medium
                    { clip: 'inset(0 0 45% 0)', duration: 150 },   // Jump
                    { clip: 'inset(0 0 38% 0)', duration: 350 },   // Slower
                    { clip: 'inset(0 0 30% 0)', duration: 200 },   // Medium
                    { clip: 'inset(0 0 22% 0)', duration: 400 },   // Slow
                    { clip: 'inset(0 0 15% 0)', duration: 180 },   // Jump
                    { clip: 'inset(0 0 8% 0)', duration: 300 },    // Slower
                    { clip: 'inset(0 0 3% 0)', duration: 250 },    // Almost done
                    { clip: 'inset(0 0 0 0)', duration: 400 }      // Final reveal
                ];

                for (const step of revealSteps) {
                    imgSharp.style.transition = `clip-path ${step.duration}ms ease-out`;
                    imgSharp.style.clipPath = step.clip;
                    await this.sleep(step.duration);
                }
            };

            imgBlurred.onerror = () => {
                placeholder.textContent = `Failed to load image: ${path}`;
                placeholder.style.height = 'auto';
            };
        } else {
            // Just display the image immediately with no animation
            const messageDiv = this.createMessage('assistant', '', true);
            const img = document.createElement('img');
            img.className = 'message-image';
            img.src = path;
            img.alt = 'Generated image';

            img.onerror = () => {
                messageDiv.querySelector('.message-content').textContent = `Failed to load image: ${path}`;
            };

            messageDiv.querySelector('.message-content').appendChild(img);
        }
    }

    async commandWait(duration) {
        const seconds = parseInt(duration) || 10;
        await this.sleep(seconds * 1000);
    }

    async commandUser() {
        this.waitingForUser = true;
        this.enableUserInput();
    }

    async commandClear() {
        // Fade out effect
        this.chatMessages.style.opacity = '0';
        await this.sleep(300);
        this.chatMessages.innerHTML = '';
        this.chatMessages.style.opacity = '1';
    }

    handleUserMessage() {
        if (!this.waitingForUser) return;

        const text = this.userInput.value.trim();
        if (!text) return;

        this.createMessage('user', text);
        this.userInput.value = '';
        this.userInput.style.height = 'auto';

        this.disableUserInput();
        this.waitingForUser = false;
        this.executeScript();
    }

    createMessage(role, text, skipType = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;

        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.textContent = role === 'user' ? '👤' : '🤖';

        const content = document.createElement('div');
        content.className = 'message-content';

        if (text && !skipType && role === 'user') {
            const textDiv = document.createElement('div');
            textDiv.className = 'message-text';
            textDiv.textContent = text;
            content.appendChild(textDiv);
        } else if (text && skipType) {
            const textDiv = document.createElement('div');
            textDiv.className = 'message-text';
            textDiv.textContent = text;
            content.appendChild(textDiv);
        } else if (text) {
            const textDiv = document.createElement('div');
            textDiv.className = 'message-text';
            content.appendChild(textDiv);
        }

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();

        return messageDiv;
    }

    async typeMessage(element, text, speed = 20) {
        element.textContent = '';
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            this.scrollToBottom();
            await this.sleep(speed);
        }
    }

    enableUserInput() {
        this.userInput.disabled = false;
        this.sendBtn.disabled = false;
        this.userInput.focus();
    }

    disableUserInput() {
        this.userInput.disabled = true;
        this.sendBtn.disabled = true;
    }

    scrollToBottom() {
        if (!this.autoScroll) return;

        const targetScroll = this.chatMessages.scrollHeight;

        if (this.smoothScroll) {
            // Smooth gradual scroll
            this.smoothScrollTo(targetScroll);
        } else {
            // Instant jump
            this.chatMessages.scrollTop = targetScroll;
        }
    }

    smoothScrollTo(target) {
        if (this.isScrolling) return;

        const start = this.chatMessages.scrollTop;
        const distance = target - start;

        // Speed: 1 (slow) = 2000ms, 10 (fast) = 200ms
        const duration = 2200 - (this.scrollSpeed * 200);
        const startTime = performance.now();

        this.isScrolling = true;

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out function for smooth deceleration
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            this.chatMessages.scrollTop = start + (distance * easeProgress);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                this.isScrolling = false;
            }
        };

        requestAnimationFrame(animateScroll);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
});
