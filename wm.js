/**
 * WINDOW MANAGER - WM.JS
 * Complete window management system for retro web OS
 */

const WindowManager = (() => {
    // Private state
    let windows = [];
    let apps = {};
    let zIndexCounter = 1000;
    let windowIdCounter = 0;

    // Desktop and taskbar elements
    const desktop = document.getElementById('desktop');
    const taskbarWindows = document.getElementById('taskbar-windows');
    const startMenu = document.getElementById('start-menu');
    const startButton = document.getElementById('start-button');

    /**
     * Create a new window
     * @param {Object} options - Window configuration
     */
    function createWindow(options = {}) {
        const windowId = `window-${windowIdCounter++}`;

        // Default options
        const config = {
            title: options.title || 'Untitled',
            icon: options.icon || '📄',
            content: options.content || '',
            width: options.width || 400,
            height: options.height || 300,
            x: options.x !== undefined ? options.x : (100 + windows.length * 30),
            y: options.y !== undefined ? options.y : (50 + windows.length * 30),
            resizable: options.resizable !== undefined ? options.resizable : true,
            onFocus: options.onFocus || null,
            onClose: options.onClose || null,
            onMinimize: options.onMinimize || null,
            onMaximize: options.onMaximize || null
        };

        // Create window element
        const windowEl = document.createElement('div');
        windowEl.className = 'window';
        windowEl.id = windowId;
        windowEl.style.width = `${config.width}px`;
        windowEl.style.height = `${config.height}px`;
        windowEl.style.left = `${config.x}px`;
        windowEl.style.top = `${config.y}px`;

        // Build window structure
        const maximizeButton = config.resizable
            ? '<button class="window-button maximize-btn" title="Maximize">□</button>'
            : '';
        const resizeHandle = config.resizable
            ? '<div class="window-resize-handle"></div>'
            : '';

        windowEl.innerHTML = `
            <div class="window-titlebar">
                <div class="window-title">
                    <span class="window-icon">${config.icon}</span>
                    <span class="window-title-text">${config.title}</span>
                </div>
                <div class="window-controls">
                    <button class="window-button minimize-btn" title="Minimize">_</button>
                    ${maximizeButton}
                    <button class="window-button close-btn" title="Close">×</button>
                </div>
            </div>
            <div class="window-content">
                ${config.content}
            </div>
            ${resizeHandle}
        `;

        desktop.appendChild(windowEl);

        // Create window state object
        const windowState = {
            id: windowId,
            element: windowEl,
            config: config,
            isMinimized: false,
            isMaximized: false,
            previousState: null,
            taskbarButton: null
        };

        windows.push(windowState);

        // Create taskbar button
        createTaskbarButton(windowState);

        // Set up event handlers
        setupWindowEvents(windowState);

        // Focus the new window
        focusWindow(windowState);

        return windowState;
    }

    /**
     * Create a taskbar button for a window
     */
    function createTaskbarButton(windowState) {
        const button = document.createElement('button');
        button.className = 'taskbar-window-button';
        button.innerHTML = `
            <span class="taskbar-window-icon">${windowState.config.icon}</span>
            <span class="taskbar-window-title">${windowState.config.title}</span>
        `;

        button.addEventListener('click', () => {
            if (windowState.isMinimized) {
                restoreWindow(windowState);
            } else if (windowState.element.classList.contains('focused')) {
                minimizeWindow(windowState);
            } else {
                focusWindow(windowState);
            }
        });

        taskbarWindows.appendChild(button);
        windowState.taskbarButton = button;
    }

    /**
     * Set up all event handlers for a window
     */
    function setupWindowEvents(windowState) {
        const { element, config } = windowState;
        const titlebar = element.querySelector('.window-titlebar');
        const minimizeBtn = element.querySelector('.minimize-btn');
        const maximizeBtn = element.querySelector('.maximize-btn');
        const closeBtn = element.querySelector('.close-btn');
        const resizeHandle = element.querySelector('.window-resize-handle');

        // Focus on click (but not on buttons, inputs, or interactive elements)
        element.addEventListener('mousedown', (e) => {
            // Don't focus if clicking on interactive elements
            if (e.target.closest('button, input, select, textarea, a')) {
                return;
            }
            focusWindow(windowState);
        });

        // Dragging
        setupDragging(windowState, titlebar);

        // Resizing (only if resizable)
        if (config.resizable && resizeHandle) {
            setupResizing(windowState, resizeHandle);
        }

        // Window controls
        minimizeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            minimizeWindow(windowState);
        });

        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMaximize(windowState);
            });
        }

        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeWindow(windowState);
        });

        // Double-click titlebar to maximize
        titlebar.addEventListener('dblclick', (e) => {
            if (e.target === titlebar || e.target.closest('.window-title')) {
                toggleMaximize(windowState);
            }
        });
    }

    /**
     * Setup window dragging
     */
    function setupDragging(windowState, titlebar) {
        let isDragging = false;
        let startX, startY, initialX, initialY;

        titlebar.addEventListener('mousedown', (e) => {
            if (e.target.closest('.window-controls')) return;
            if (windowState.isMaximized) return;

            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;

            const rect = windowState.element.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;

            titlebar.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            let newX = initialX + deltaX;
            let newY = initialY + deltaY;

            // Prevent dragging completely off-screen
            const windowRect = windowState.element.getBoundingClientRect();
            const minVisibleWidth = 100;
            const minVisibleHeight = 40;

            // Constrain X position
            if (newX + windowRect.width < minVisibleWidth) {
                newX = minVisibleWidth - windowRect.width;
            }
            if (newX > window.innerWidth - minVisibleWidth) {
                newX = window.innerWidth - minVisibleWidth;
            }

            // Constrain Y position
            if (newY < 0) {
                newY = 0;
            }
            if (newY > window.innerHeight - 40 - minVisibleHeight) {
                newY = window.innerHeight - 40 - minVisibleHeight;
            }

            windowState.element.style.left = `${newX}px`;
            windowState.element.style.top = `${newY}px`;
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                titlebar.style.cursor = 'move';
            }
        });
    }

    /**
     * Setup window resizing
     */
    function setupResizing(windowState, resizeHandle) {
        let isResizing = false;
        let startX, startY, startWidth, startHeight;

        resizeHandle.addEventListener('mousedown', (e) => {
            if (windowState.isMaximized) return;

            e.stopPropagation();
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;

            const rect = windowState.element.getBoundingClientRect();
            startWidth = rect.width;
            startHeight = rect.height;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            const newWidth = Math.max(200, startWidth + deltaX);
            const newHeight = Math.max(100, startHeight + deltaY);

            windowState.element.style.width = `${newWidth}px`;
            windowState.element.style.height = `${newHeight}px`;
        });

        document.addEventListener('mouseup', () => {
            if (isResizing) {
                isResizing = false;
            }
        });
    }

    /**
     * Focus a window
     */
    function focusWindow(windowState) {
        // Remove focus from all windows
        windows.forEach(w => {
            w.element.classList.remove('focused');
            if (w.taskbarButton) {
                w.taskbarButton.classList.remove('active');
            }
        });

        // Focus this window
        windowState.element.classList.add('focused');
        windowState.element.style.zIndex = ++zIndexCounter;

        if (windowState.taskbarButton) {
            windowState.taskbarButton.classList.add('active');
        }

        // Call callback
        if (windowState.config.onFocus) {
            windowState.config.onFocus(windowState);
        }
    }

    /**
     * Minimize a window
     */
    function minimizeWindow(windowState) {
        windowState.isMinimized = true;
        windowState.element.classList.add('minimized');
        windowState.element.classList.remove('focused');

        if (windowState.taskbarButton) {
            windowState.taskbarButton.classList.remove('active');
        }

        // Call callback
        if (windowState.config.onMinimize) {
            windowState.config.onMinimize(windowState);
        }

        // Focus next available window
        const visibleWindows = windows.filter(w => !w.isMinimized);
        if (visibleWindows.length > 0) {
            focusWindow(visibleWindows[visibleWindows.length - 1]);
        }
    }

    /**
     * Restore a minimized window
     */
    function restoreWindow(windowState) {
        windowState.isMinimized = false;
        windowState.element.classList.remove('minimized');
        focusWindow(windowState);
    }

    /**
     * Toggle maximize state
     */
    function toggleMaximize(windowState) {
        if (windowState.isMaximized) {
            // Restore
            windowState.isMaximized = false;
            windowState.element.classList.remove('maximized');

            if (windowState.previousState) {
                windowState.element.style.left = windowState.previousState.left;
                windowState.element.style.top = windowState.previousState.top;
                windowState.element.style.width = windowState.previousState.width;
                windowState.element.style.height = windowState.previousState.height;
            }
        } else {
            // Maximize
            windowState.previousState = {
                left: windowState.element.style.left,
                top: windowState.element.style.top,
                width: windowState.element.style.width,
                height: windowState.element.style.height
            };

            windowState.isMaximized = true;
            windowState.element.classList.add('maximized');

            // Call callback
            if (windowState.config.onMaximize) {
                windowState.config.onMaximize(windowState);
            }
        }
    }

    /**
     * Close a window
     */
    function closeWindow(windowState) {
        // Call callback
        if (windowState.config.onClose) {
            windowState.config.onClose(windowState);
        }

        // Remove from DOM
        windowState.element.remove();

        // Remove taskbar button
        if (windowState.taskbarButton) {
            windowState.taskbarButton.remove();
        }

        // Remove from windows array
        const index = windows.indexOf(windowState);
        if (index > -1) {
            windows.splice(index, 1);
        }

        // Focus next available window
        if (windows.length > 0) {
            focusWindow(windows[windows.length - 1]);
        }
    }

    /**
     * Register an application
     */
    function registerApp(app) {
        if (!app.id || !app.launch) {
            console.error('App must have an id and launch function');
            return;
        }

        apps[app.id] = {
            id: app.id,
            title: app.title || app.id,
            icon: app.icon || '📄',
            launch: app.launch
        };
    }

    /**
     * Launch a registered application
     */
    function launchApp(appId) {
        const app = apps[appId];
        if (!app) {
            console.error(`App "${appId}" not found`);
            return;
        }

        app.launch();
    }

    /**
     * Toggle start menu
     */
    function toggleStartMenu() {
        if (startMenu.classList.contains('hidden')) {
            openStartMenu();
        } else {
            closeStartMenu();
        }
    }

    /**
     * Open start menu
     */
    function openStartMenu() {
        startMenu.classList.remove('hidden');
        startButton.classList.add('active');
    }

    /**
     * Close start menu
     */
    function closeStartMenu() {
        startMenu.classList.add('hidden');
        startButton.classList.remove('active');
        // Also hide submenu
        const gamesSubmenu = document.getElementById('games-submenu');
        if (gamesSubmenu) {
            gamesSubmenu.classList.add('hidden');
        }
    }

    /**
     * Get all open windows
     */
    function getWindows() {
        return windows;
    }

    /**
     * Get all registered apps
     */
    function getApps() {
        return apps;
    }

    // Public API
    return {
        createWindow,
        registerApp,
        launchApp,
        getWindows,
        getApps,
        focusWindow,
        minimizeWindow,
        restoreWindow,
        closeWindow,
        toggleStartMenu,
        openStartMenu,
        closeStartMenu
    };
})();
