/**
 * CRT.JS
 * Glitch and corruption effects for horror/CRT aesthetic
 */

const CRTEffects = (() => {

    /**
     * Trigger a random glitch on the screen
     * @param {number} duration - Duration in ms (default: 200)
     */
    function randomGlitch(duration = 200) {
        document.body.classList.add('glitch', 'signal-loss');

        setTimeout(() => {
            document.body.classList.remove('glitch', 'signal-loss');
        }, duration);
    }

    /**
     * Trigger screen flicker
     * @param {number} duration - Duration in ms (default: 150)
     */
    function flicker(duration = 150) {
        document.body.classList.add('flicker');

        setTimeout(() => {
            document.body.classList.remove('flicker');
        }, duration);
    }

    /**
     * Corrupt a specific window by ID
     * @param {string} windowId - ID of the window element
     */
    function corruptWindow(windowId) {
        const window = document.getElementById(windowId);
        if (!window) {
            console.error(`Window with ID "${windowId}" not found`);
            return;
        }

        // Add corruption classes
        window.classList.add('win-corrupt');

        // Corrupt the title
        const titleText = window.querySelector('.window-title-text');
        if (titleText) {
            const originalText = titleText.textContent;
            titleText.setAttribute('data-text', originalText);
            titleText.classList.add('glitch');

            // Randomly corrupt characters
            let corruptedText = '';
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() > 0.7) {
                    corruptedText += String.fromCharCode(33 + Math.floor(Math.random() * 94));
                } else {
                    corruptedText += originalText[i];
                }
            }
            titleText.textContent = corruptedText;
        }

        // Corrupt the content
        const content = window.querySelector('.window-content');
        if (content) {
            content.style.color = '#0f0';
            content.style.background = '#000';
            content.style.textShadow = '0 0 5px #0f0';
        }

        return window;
    }

    /**
     * Restore a corrupted window
     * @param {string} windowId - ID of the window element
     */
    function restoreWindow(windowId) {
        const window = document.getElementById(windowId);
        if (!window) return;

        window.classList.remove('win-corrupt');

        const titleText = window.querySelector('.window-title-text');
        if (titleText) {
            const originalText = titleText.getAttribute('data-text');
            if (originalText) {
                titleText.textContent = originalText;
            }
            titleText.classList.remove('glitch');
        }

        const content = window.querySelector('.window-content');
        if (content) {
            content.style.color = '';
            content.style.background = '';
            content.style.textShadow = '';
        }
    }

    /**
     * Apply glitch effect to specific text element
     * @param {HTMLElement} element - Element to glitch
     * @param {number} duration - Duration in ms (default: 2000)
     */
    function glitchText(element, duration = 2000) {
        if (!element) return;

        const originalText = element.textContent;
        element.setAttribute('data-text', originalText);
        element.classList.add('glitch');

        setTimeout(() => {
            element.classList.remove('glitch');
        }, duration);
    }

    /**
     * Add noise overlay to the screen
     */
    function addNoiseOverlay() {
        if (document.querySelector('.noise-overlay')) return;

        const noise = document.createElement('div');
        noise.className = 'noise-overlay';
        document.body.appendChild(noise);
    }

    /**
     * Remove noise overlay
     */
    function removeNoiseOverlay() {
        const noise = document.querySelector('.noise-overlay');
        if (noise) {
            noise.remove();
        }
    }

    /**
     * Enable CRT mode
     * @param {string} phosphorColor - 'green', 'amber', or 'blue' (default: 'green')
     */
    function enableCRTMode(phosphorColor = 'green') {
        document.body.classList.add('crt', 'crt-screen');

        // Set phosphor color
        document.body.classList.remove('phosphor-green', 'phosphor-amber', 'phosphor-blue');
        document.body.classList.add(`phosphor-${phosphorColor}`);

        // Add noise overlay
        addNoiseOverlay();
    }

    /**
     * Disable CRT mode
     */
    function disableCRTMode() {
        document.body.classList.remove('crt', 'crt-screen', 'phosphor-green', 'phosphor-amber', 'phosphor-blue');
        removeNoiseOverlay();
    }

    /**
     * Start random glitch intervals
     * @param {number} minInterval - Minimum interval in ms (default: 5000)
     * @param {number} maxInterval - Maximum interval in ms (default: 15000)
     * @returns {number} Interval ID
     */
    function startRandomGlitches(minInterval = 5000, maxInterval = 15000) {
        function scheduleNextGlitch() {
            const delay = minInterval + Math.random() * (maxInterval - minInterval);

            return setTimeout(() => {
                randomGlitch(100 + Math.random() * 200);
                scheduleNextGlitch();
            }, delay);
        }

        return scheduleNextGlitch();
    }

    /**
     * Corrupt random text on page
     */
    function corruptRandomText() {
        const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
        if (textElements.length === 0) return;

        const randomElement = textElements[Math.floor(Math.random() * textElements.length)];
        const originalText = randomElement.textContent;

        if (!originalText || originalText.length === 0) return;

        // Corrupt some characters
        let corruptedText = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() > 0.8) {
                const glitchChars = '█▓▒░!@#$%^&*()_+{}|:"<>?~`';
                corruptedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                corruptedText += originalText[i];
            }
        }

        randomElement.textContent = corruptedText;

        // Restore after a delay
        setTimeout(() => {
            randomElement.textContent = originalText;
        }, 1000 + Math.random() * 2000);
    }

    /**
     * Apply chromatic aberration to element
     * @param {HTMLElement} element - Element to apply effect to
     */
    function chromaticAberration(element) {
        if (!element) return;

        const text = element.textContent;
        element.setAttribute('data-text', text);
        element.classList.add('chromatic-aberration');
    }

    /**
     * Simulate signal loss
     * @param {number} duration - Duration in ms (default: 500)
     */
    function signalLoss(duration = 500) {
        document.body.classList.add('signal-loss');

        setTimeout(() => {
            document.body.classList.remove('signal-loss');
        }, duration);
    }

    /**
     * Create distortion wave effect
     * @param {number} duration - Duration in ms (default: 3000)
     */
    function distortionWave(duration = 3000) {
        document.body.classList.add('distort');

        setTimeout(() => {
            document.body.classList.remove('distort');
        }, duration);
    }

    /**
     * VHS tracking effect
     */
    function vhsTracking() {
        if (!document.querySelector('.vhs-tracking-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'vhs-tracking';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9997;
            `;
            document.body.appendChild(overlay);
        }
    }

    /**
     * Glitch all windows currently open
     */
    function glitchAllWindows() {
        const windows = document.querySelectorAll('.window');
        windows.forEach((win, index) => {
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    corruptWindow(win.id);
                    setTimeout(() => {
                        restoreWindow(win.id);
                    }, 1000 + Math.random() * 2000);
                }
            }, index * 200);
        });
    }

    /**
     * Panic mode - all effects at once
     * @param {number} duration - Duration in ms (default: 3000)
     */
    function panicMode(duration = 3000) {
        randomGlitch(duration);
        flicker(duration);
        signalLoss(duration);
        distortionWave(duration);

        const glitchInterval = setInterval(() => {
            corruptRandomText();
        }, 200);

        setTimeout(() => {
            clearInterval(glitchInterval);
        }, duration);
    }

    // Public API
    return {
        randomGlitch,
        flicker,
        corruptWindow,
        restoreWindow,
        glitchText,
        addNoiseOverlay,
        removeNoiseOverlay,
        enableCRTMode,
        disableCRTMode,
        startRandomGlitches,
        corruptRandomText,
        chromaticAberration,
        signalLoss,
        distortionWave,
        vhsTracking,
        glitchAllWindows,
        panicMode
    };
})();

// Example usage (commented out by default):
/*
// Enable CRT mode with green phosphor
CRTEffects.enableCRTMode('green');

// Start random glitches every 5-15 seconds
CRTEffects.startRandomGlitches(5000, 15000);

// Corrupt a specific window
CRTEffects.corruptWindow('window-1');

// Trigger panic mode
CRTEffects.panicMode(5000);
*/
