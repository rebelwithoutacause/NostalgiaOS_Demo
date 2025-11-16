/**
 * APPS.JS
 * Application definitions for retro web OS
 */

function initializeApps() {

    // =====================
    // MY COMPUTER
    // =====================
    WindowManager.registerApp({
        id: 'mycomputer',
        title: 'My Computer',
        icon: '💻',
        launch() {
            WindowManager.createWindow({
                title: 'My Computer',
                icon: '💻',
                width: 500,
                height: 400,
                content: `
                    <div class="file-browser">
                        <div class="file-item" data-target="documents">
                            <span class="file-icon">📁</span>
                            <span class="file-name">C:\\Documents</span>
                        </div>
                        <div class="file-item" data-target="games">
                            <span class="file-icon">🎮</span>
                            <span class="file-name">C:\\Games</span>
                        </div>
                        <div class="file-item">
                            <span class="file-icon">🖥️</span>
                            <span class="file-name">C:\\System</span>
                        </div>
                        <div class="file-item">
                            <span class="file-icon">💿</span>
                            <span class="file-name">D:\\</span>
                        </div>
                    </div>
                `
            });

            // Add click handlers for navigable items
            setTimeout(() => {
                const documentsItem = document.querySelector('.file-item[data-target="documents"]');
                const gamesItem = document.querySelector('.file-item[data-target="games"]');

                if (documentsItem) {
                    documentsItem.addEventListener('dblclick', () => {
                        WindowManager.launchApp('documents');
                    });
                }

                if (gamesItem) {
                    gamesItem.addEventListener('dblclick', () => {
                        launchGamesFolder();
                    });
                }
            }, 100);
        }
    });

    // =====================
    // DOCUMENTS
    // =====================
    WindowManager.registerApp({
        id: 'documents',
        title: 'Documents',
        icon: '📁',
        launch() {
            const win = WindowManager.createWindow({
                title: 'C:\\Documents',
                icon: '📁',
                width: 500,
                height: 350,
                content: `
                    <div class="documents-view" style="padding: 10px; font-family: 'MS Sans Serif', Arial, sans-serif; background: white; height: 100%; box-sizing: border-box; overflow: auto; text-align: left;">
                        <div class="file-item" data-file="aboutme" style="display: inline-block; width: 70px; text-align: center; margin: 0 8px 8px 0; cursor: pointer; user-select: none; vertical-align: top;">
                            <div style="font-size: 32px;">📄</div>
                            <div style="font-size: 11px; margin-top: 4px; word-wrap: break-word;">About Me.txt</div>
                        </div>
                        <div class="file-item" data-file="links" style="display: inline-block; width: 70px; text-align: center; margin: 0 8px 8px 0; cursor: pointer; user-select: none; vertical-align: top;">
                            <div style="font-size: 32px;">🌐</div>
                            <div style="font-size: 11px; margin-top: 4px; word-wrap: break-word;">Internet Oddities.txt</div>
                        </div>
                    </div>
                `
            });

            // Ensure title displays on one row
            const titleText = win.element.querySelector('.window-title-text');
            if (titleText) {
                titleText.style.whiteSpace = 'nowrap';
                titleText.style.overflow = 'hidden';
                titleText.style.textOverflow = 'ellipsis';
            }

            // Add double-click handler for files
            const fileItems = win.element.querySelectorAll('.file-item');

            fileItems.forEach(fileItem => {
                let clickCount = 0;
                let clickTimer = null;

                fileItem.addEventListener('click', function() {
                    clickCount++;

                    // Clear other selections
                    fileItems.forEach(item => {
                        if (item !== this) {
                            item.style.background = 'transparent';
                            item.style.color = 'black';
                        }
                    });

                    // Highlight on single click
                    this.style.background = '#0078d7';
                    this.style.color = 'white';

                    if (clickCount === 1) {
                        clickTimer = setTimeout(() => {
                            clickCount = 0;
                        }, 300);
                    } else if (clickCount === 2) {
                        clearTimeout(clickTimer);
                        clickCount = 0;

                        const fileType = this.getAttribute('data-file');

                        if (fileType === 'aboutme') {
                            // Open About Me file
                            WindowManager.createWindow({
                                title: 'About Me.txt - Notepad',
                                icon: '📄',
                                width: 550,
                                height: 350,
                                content: `
                                    <div style="display: flex; flex-direction: column; height: 100%; background: #c0c0c0; font-family: 'MS Sans Serif', Arial, sans-serif;">
                                        <!-- Menu Bar -->
                                        <div style="background: #c0c0c0; border-bottom: 2px solid #808080; display: flex; font-size: 11px;">
                                            <div style="padding: 3px 8px; cursor: default;">File</div>
                                            <div style="padding: 3px 8px; cursor: default;">Edit</div>
                                            <div style="padding: 3px 8px; cursor: default;">Search</div>
                                            <div style="padding: 3px 8px; cursor: default;">Help</div>
                                        </div>
                                        <!-- Text Area -->
                                        <div style="flex: 1; background: white; margin: 2px; border: 2px inset #808080; padding: 4px; overflow: auto;">
                                            <div style="margin: 0; font-family: 'Fixedsys', 'Courier New', monospace; font-size: 14px; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word;">Hi, I'm Tedd – QA Manual & Automation tester, Cybersecurity and IT explorer.

I'm driven by puzzles, mysteries, and the thrill of horror.

Curious, creative, and always pushing boundaries.

Contacts: <a href="https://bio.link/qatestertedd" target="_blank" style="color: #0000ff; text-decoration: underline; cursor: pointer;">https://bio.link/qatestertedd</a></div>
                                        </div>
                                    </div>
                                `
                            });
                        } else if (fileType === 'links') {
                            // Open Internet Oddities file
                            WindowManager.createWindow({
                                title: 'Internet Oddities.txt - Notepad',
                                icon: '🌐',
                                width: 650,
                                height: 550,
                                content: `
                                    <div style="display: flex; flex-direction: column; height: 100%; background: #c0c0c0; font-family: 'MS Sans Serif', Arial, sans-serif;">
                                        <!-- Menu Bar -->
                                        <div style="background: #c0c0c0; border-bottom: 2px solid #808080; display: flex; font-size: 11px;">
                                            <div style="padding: 3px 8px; cursor: default;">File</div>
                                            <div style="padding: 3px 8px; cursor: default;">Edit</div>
                                            <div style="padding: 3px 8px; cursor: default;">Search</div>
                                            <div style="padding: 3px 8px; cursor: default;">Help</div>
                                        </div>
                                        <!-- Text Area -->
                                        <div style="flex: 1; background: white; margin: 2px; border: 2px inset #808080; padding: 8px; overflow: auto;">
                                            <div style="margin: 0; font-family: 'Fixedsys', 'Courier New', monospace; font-size: 12px; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word;">~~~~~ Internet Oddities ~~~~~
<a href="https://www.youtube.com/@LOCAL58TV" target="_blank" style="color: #0000ff; text-decoration: underline;">Local58 Archive (Eerie / Surreal Videos)</a>
<a href="https://www.youtube.com/watch?v=I2O7blSSzpI" target="_blank" style="color: #0000ff; text-decoration: underline;">Cicada 3301 (Puzzles & Mystery)</a>
<a href="https://www.reddit.com/r/nosleep" target="_blank" style="color: #0000ff; text-decoration: underline;">Weird Stories & ARGs</a>
<a href="https://www.youtube.com/watch?v=nhYltcw8WAA" target="_blank" style="color: #0000ff; text-decoration: underline;">Unsettling Videos</a>
<a href="https://www.youtube.com/watch?v=XkjSsmxCPNg" target="_blank" style="color: #0000ff; text-decoration: underline;">https://www.youtube.com/watch?v=XkjSsmxCPNg</a>
<a href="https://www.youtube.com/watch?v=L8f1ADDcFDI" target="_blank" style="color: #0000ff; text-decoration: underline;">https://www.youtube.com/watch?v=L8f1ADDcFDI</a>
<a href="https://www.youtube.com/@NightMind" target="_blank" style="color: #0000ff; text-decoration: underline;">https://www.youtube.com/@NightMind</a>
<a href="https://www.youtube.com/@LiminalLand" target="_blank" style="color: #0000ff; text-decoration: underline;">https://www.youtube.com/@LiminalLand</a>
<a href="https://www.youtube.com/@NukesTop5" target="_blank" style="color: #0000ff; text-decoration: underline;">https://www.youtube.com/@NukesTop5</a>
<a href="https://www.youtube.com/@BarelySociable" target="_blank" style="color: #0000ff; text-decoration: underline;">https://www.youtube.com/@BarelySociable</a>

<a href="https://www.creepypasta.com/" target="_blank" style="color: #0000ff; text-decoration: underline;">https://www.creepypasta.com/</a>
<a href="https://www.gamedetectives.net/" target="_blank" style="color: #0000ff; text-decoration: underline;">https://www.gamedetectives.net/</a>
<a href="https://web.archive.org/web/20250000000000*/404.com" target="_blank" style="color: #0000ff; text-decoration: underline;">https://web.archive.org/web/20250000000000*/404.com</a>



~~~~~ Tech & Learning ~~~~~
<a href="https://www.learncs.org" target="_blank" style="color: #0000ff; text-decoration: underline;">Learn C# Online</a>
<a href="https://www.guru99.com/software-testing.html" target="_blank" style="color: #0000ff; text-decoration: underline;">QA Testing Tips</a>
<a href="https://docs.microsoft.com/en-us/dotnet/core/testing/" target="_blank" style="color: #0000ff; text-decoration: underline;">Unit Testing in C#</a>
<a href="https://www.tryhackme.com" target="_blank" style="color: #0000ff; text-decoration: underline;">Cybersecurity Practice</a>
<a href="https://www.selenium.dev/documentation/" target="_blank" style="color: #0000ff; text-decoration: underline;">Selenium Testing Tutorials</a>
<a href="https://softuni.bg" target="_blank" style="color: #0000ff; text-decoration: underline;">SoftUni Learning Portal</a>

~~~~~ Fun / Puzzles ~~~~~
<a href="https://www.brainbashers.com" target="_blank" style="color: #0000ff; text-decoration: underline;">Logic Puzzles & Brain Teasers</a>
<a href="https://www.riddles.com" target="_blank" style="color: #0000ff; text-decoration: underline;">Riddles & Mind Games</a>
<a href="https://www.projecteuler.net" target="_blank" style="color: #0000ff; text-decoration: underline;">Daily Math Challenges</a>
<a href="https://www.lockpaperscissors.co/escape-games" target="_blank" style="color: #0000ff; text-decoration: underline;">Escape Room Games Online</a>


~~~~~ Mystery / Inspiration ~~~~~
<a href="https://twinpeaks.fandom.com" target="_blank" style="color: #0000ff; text-decoration: underline;">Twin Peaks Fan Wiki</a>
<a href="https://www.mobygames.com/game/harvester" target="_blank" style="color: #0000ff; text-decoration: underline;">Harvester Game Info</a>
<a href="https://www.eapoe.org" target="_blank" style="color: #0000ff; text-decoration: underline;">Edgar Allan Poe Stories</a>
<a href="https://www.imdb.com/genre/horror" target="_blank" style="color: #0000ff; text-decoration: underline;">Horror Movie Database</a></div>
                                        </div>
                                    </div>
                                `
                            });
                        }
                    }
                });
            });

            // Remove selection when clicking outside
            win.element.querySelector('.documents-view').addEventListener('click', (e) => {
                if (e.target.classList.contains('documents-view')) {
                    fileItems.forEach(item => {
                        item.style.background = 'transparent';
                        item.style.color = 'black';
                    });
                }
            });
        }
    });

    // =====================
    // GAMES FOLDER
    // =====================
    function launchGamesFolder() {
        WindowManager.createWindow({
            title: 'C:\\Games',
            icon: '🎮',
            width: 500,
            height: 400,
            content: `
                <div class="file-browser">
                    <div class="file-item" data-game="tetris">
                        <span class="file-icon"><img src="tetris.png" style="width: 32px; height: 32px; vertical-align: middle;"></span>
                        <span class="file-name">Tetris.exe</span>
                    </div>
                    <div class="file-item" data-game="solitaire">
                        <span class="file-icon">🃏</span>
                        <span class="file-name">Solitaire.exe</span>
                    </div>
                    <div class="file-item" data-game="minesweeper">
                        <span class="file-icon">💣</span>
                        <span class="file-name">Minesweeper.exe</span>
                    </div>
                </div>
            `
        });

        // Add click handlers for games
        setTimeout(() => {
            document.querySelectorAll('.file-item[data-game]').forEach(item => {
                item.addEventListener('dblclick', () => {
                    const game = item.getAttribute('data-game');
                    WindowManager.launchApp(game);
                });
            });
        }, 100);
    }

    // =====================
    // SOLITAIRE - KLONDIKE
    // =====================
    WindowManager.registerApp({
        id: 'solitaire',
        title: 'Solitaire',
        icon: '🃏',
        launch() {
            const win = WindowManager.createWindow({
                title: 'Solitaire',
                icon: '🃏',
                width: 720,
                height: 610,
                resizable: false,
                content: `
                    <div id="sol-container" style="background: #008000; height: 100%; box-sizing: border-box; overflow: hidden; font-family: Arial, sans-serif; display: flex; flex-direction: column;">
                        <!-- Menu Bar -->
                        <div style="background: #c0c0c0; border-bottom: 2px solid #808080; display: flex; gap: 0; font-size: 13px;">
                            <div class="sol-menu-item" style="position: relative; padding: 4px 12px; cursor: pointer; user-select: none;">
                                <span>Game</span>
                                <div class="sol-dropdown" style="display: none; position: absolute; top: 100%; left: 0; background: #c0c0c0; border: 2px solid; border-color: #fff #000 #000 #fff; min-width: 150px; z-index: 1000; box-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                                    <div class="sol-menu-option" data-action="new-game" style="padding: 6px 12px; cursor: pointer;">New Game</div>
                                    <div style="height: 1px; background: #808080; margin: 2px 0;"></div>
                                    <div class="sol-menu-option" data-action="undo" style="padding: 6px 12px; cursor: pointer; color: #808080;">Undo</div>
                                    <div class="sol-menu-option" data-action="hint" style="padding: 6px 12px; cursor: pointer; color: #808080;">Hint</div>
                                </div>
                            </div>
                            <div class="sol-menu-item" style="position: relative; padding: 4px 12px; cursor: pointer; user-select: none;">
                                <span>Theme</span>
                                <div class="sol-dropdown" style="display: none; position: absolute; top: 100%; left: 0; background: #c0c0c0; border: 2px solid; border-color: #fff #000 #000 #fff; min-width: 150px; z-index: 1000; box-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                                    <div class="sol-menu-option" data-theme="classic" style="padding: 6px 12px; cursor: pointer; background: #008000; color: white; margin: 2px;">Classic Green</div>
                                    <div class="sol-menu-option" data-theme="blue" style="padding: 6px 12px; cursor: pointer; background: #000080; color: white; margin: 2px;">Royal Blue</div>
                                    <div class="sol-menu-option" data-theme="burgundy" style="padding: 6px 12px; cursor: pointer; background: #800020; color: white; margin: 2px;">Burgundy</div>
                                    <div class="sol-menu-option" data-theme="forest" style="padding: 6px 12px; cursor: pointer; background: #0d5c0d; color: white; margin: 2px;">Forest Green</div>
                                    <div class="sol-menu-option" data-theme="slate" style="padding: 6px 12px; cursor: pointer; background: #2f4f4f; color: white; margin: 2px;">Slate Gray</div>
                                </div>
                            </div>
                            <div class="sol-menu-item" style="position: relative; padding: 4px 12px; cursor: pointer; user-select: none;">
                                <span>Card Style</span>
                                <div class="sol-dropdown" style="display: none; position: absolute; top: 100%; left: 0; background: #c0c0c0; border: 2px solid; border-color: #fff #000 #000 #fff; min-width: 150px; z-index: 1000; box-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                                    <div class="sol-menu-option" data-card="modern" style="padding: 6px 12px; cursor: pointer;">Modern</div>
                                    <div class="sol-menu-option" data-card="classic" style="padding: 6px 12px; cursor: pointer;">Classic</div>
                                    <div class="sol-menu-option" data-card="simple" style="padding: 6px 12px; cursor: pointer;">Simple</div>
                                </div>
                            </div>
                        </div>

                        <!-- Game Area -->
                        <div style="padding: 15px; flex: 1; overflow: hidden;">
                            <div style="margin-bottom: 15px; display: flex; justify-content: flex-end; align-items: center;">
                                <div style="color: white; font-family: 'Courier New', monospace; font-size: 16px; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
                                    Score: <span id="sol-score">0</span> | Moves: <span id="sol-moves">0</span>
                                </div>
                            </div>
                            <div id="sol-board" style="position: relative; height: 500px;"></div>
                        </div>
                    </div>
                `
            });

            setTimeout(() => {
                const board = document.getElementById('sol-board');
                const scoreEl = document.getElementById('sol-score');
                const movesEl = document.getElementById('sol-moves');
                const container = document.getElementById('sol-container');

                // Menu functionality
                const menuItems = document.querySelectorAll('.sol-menu-item');
                menuItems.forEach(item => {
                    const dropdown = item.querySelector('.sol-dropdown');
                    item.addEventListener('click', (e) => {
                        e.stopPropagation();
                        // Close other dropdowns
                        document.querySelectorAll('.sol-dropdown').forEach(d => {
                            if (d !== dropdown) d.style.display = 'none';
                        });
                        // Toggle this dropdown
                        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
                    });
                    // Highlight menu on hover
                    item.addEventListener('mouseenter', () => {
                        item.style.background = '#0078d4';
                        item.style.color = 'white';
                    });
                    item.addEventListener('mouseleave', () => {
                        item.style.background = 'transparent';
                        item.style.color = 'black';
                    });
                });

                // Close dropdowns when clicking outside
                document.addEventListener('click', () => {
                    document.querySelectorAll('.sol-dropdown').forEach(d => d.style.display = 'none');
                });

                // Menu option hover effects
                document.querySelectorAll('.sol-menu-option').forEach(option => {
                    option.addEventListener('mouseenter', () => {
                        if (!option.style.color || option.style.color !== 'rgb(128, 128, 128)') {
                            option.style.background = '#0078d4';
                            option.style.color = 'white';
                        }
                    });
                    option.addEventListener('mouseleave', () => {
                        if (option.dataset.theme) {
                            // Restore theme color
                            const themes = {
                                classic: '#008000',
                                blue: '#000080',
                                burgundy: '#800020',
                                forest: '#0d5c0d',
                                slate: '#2f4f4f'
                            };
                            option.style.background = themes[option.dataset.theme];
                            option.style.color = 'white';
                        } else {
                            option.style.background = 'transparent';
                            option.style.color = option.dataset.action && (option.dataset.action === 'undo' || option.dataset.action === 'hint') ? '#808080' : 'black';
                        }
                    });
                });

                // Game state
                let stock = [];
                let waste = [];
                let foundations = [[], [], [], []];
                let tableau = [[], [], [], [], [], [], []];
                let selectedCards = null;
                let selectedSource = null;
                let score = 0;
                let moves = 0;

                // Theme and card style settings
                let currentTheme = '#008000';
                let currentCardStyle = 'modern';

                const SUITS = ['♥', '♦', '♣', '♠'];
                const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
                const SUIT_COLORS = { '♥': 'red', '♦': 'red', '♣': 'black', '♠': 'black' };

                // ===== DECK CREATION =====
                function shuffleDeck() {
                    const deck = [];
                    for (let suit of SUITS) {
                        for (let i = 0; i < RANKS.length; i++) {
                            deck.push({
                                suit,
                                rank: RANKS[i],
                                value: i + 1,
                                faceUp: false
                            });
                        }
                    }
                    // Fisher-Yates shuffle
                    for (let i = deck.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [deck[i], deck[j]] = [deck[j], deck[i]];
                    }
                    return deck;
                }

                // ===== GAME INITIALIZATION =====
                function dealCards() {
                    const deck = shuffleDeck();
                    stock = [];
                    waste = [];
                    foundations = [[], [], [], []];
                    tableau = [[], [], [], [], [], [], []];
                    selectedCards = null;
                    selectedSource = null;
                    score = 0;
                    moves = 0;

                    // Deal to tableau
                    for (let i = 0; i < 7; i++) {
                        for (let j = i; j < 7; j++) {
                            const card = deck.pop();
                            card.faceUp = (i === j);
                            tableau[j].push(card);
                        }
                    }

                    // Remaining cards go to stock
                    stock = deck;
                    render();
                }

                // ===== MOVE VALIDATION =====
                function canPlaceOnFoundation(card, foundIndex) {
                    const foundation = foundations[foundIndex];
                    if (foundation.length === 0) {
                        return card.rank === 'A';
                    }
                    const topCard = foundation[foundation.length - 1];
                    return card.suit === topCard.suit && card.value === topCard.value + 1;
                }

                function tryAutoMoveToFoundation(card, fromType, fromIndex) {
                    // Try to find a matching foundation
                    for (let i = 0; i < 4; i++) {
                        if (canPlaceOnFoundation(card, i)) {
                            moveCard([card], fromType, fromIndex, 'foundation', i);
                            return true;
                        }
                    }
                    return false;
                }

                function canPlaceOnTableau(card, pileIndex) {
                    const pile = tableau[pileIndex];
                    if (pile.length === 0) {
                        return card.rank === 'K';
                    }
                    const topCard = pile[pile.length - 1];
                    const differentColor = SUIT_COLORS[card.suit] !== SUIT_COLORS[topCard.suit];
                    return differentColor && card.value === topCard.value - 1;
                }

                function isValidSequence(cards) {
                    for (let i = 0; i < cards.length - 1; i++) {
                        const current = cards[i];
                        const next = cards[i + 1];
                        if (SUIT_COLORS[current.suit] === SUIT_COLORS[next.suit]) return false;
                        if (current.value !== next.value + 1) return false;
                    }
                    return true;
                }

                // ===== MOVE EXECUTION =====
                function drawFromStock() {
                    if (stock.length > 0) {
                        const card = stock.pop();
                        card.faceUp = true;
                        waste.push(card);
                        render();
                    } else if (waste.length > 0) {
                        // Recycle waste to stock
                        stock = waste.reverse();
                        stock.forEach(c => c.faceUp = false);
                        waste = [];
                        render();
                    }
                }

                function moveCard(cards, fromType, fromIndex, toType, toIndex) {
                    // Remove from source
                    if (fromType === 'tableau') {
                        tableau[fromIndex].splice(-cards.length);
                        if (tableau[fromIndex].length > 0) {
                            tableau[fromIndex][tableau[fromIndex].length - 1].faceUp = true;
                        }
                    } else if (fromType === 'waste') {
                        waste.pop();
                    } else if (fromType === 'foundation') {
                        foundations[fromIndex].pop();
                    }

                    // Add to destination
                    if (toType === 'tableau') {
                        tableau[toIndex].push(...cards);
                        score += 5;
                    } else if (toType === 'foundation') {
                        foundations[toIndex].push(...cards);
                        score += 10;
                    }

                    moves++;
                    selectedCards = null;
                    selectedSource = null;

                    // Check win
                    if (foundations.every(f => f.length === 13)) {
                        setTimeout(() => {
                            alert(`🎉 You Win! Score: ${score}, Moves: ${moves}`);
                        }, 300);
                    }

                    render();
                }

                // ===== CARD RENDERING =====
                function renderCard(card, isSelected = false) {
                    const div = document.createElement('div');
                    div.className = 'sol-card';

                    // Card style configurations
                    const cardStyles = {
                        modern: {
                            borderRadius: '5px',
                            borderWidth: '2px',
                            fontWeight: 'bold',
                            backColor: '#0066cc',
                            backPattern: 'repeating-linear-gradient(45deg, #0066cc, #0066cc 8px, #0055aa 8px, #0055aa 16px)'
                        },
                        classic: {
                            borderRadius: '3px',
                            borderWidth: '3px',
                            fontWeight: 'bold',
                            backColor: '#cc0000',
                            backPattern: `
                                radial-gradient(circle at 50% 50%, transparent 30%, #990000 31%, #990000 35%, transparent 36%),
                                repeating-linear-gradient(45deg, #cc0000 0px, #cc0000 3px, #aa0000 3px, #aa0000 6px)
                            `
                        },
                        simple: {
                            borderRadius: '0px',
                            borderWidth: '1px',
                            fontWeight: 'normal',
                            backColor: '#2d5016',
                            backPattern: 'linear-gradient(135deg, #2d5016 25%, #3a6b1e 25%, #3a6b1e 50%, #2d5016 50%, #2d5016 75%, #3a6b1e 75%, #3a6b1e)'
                        }
                    };

                    const style = cardStyles[currentCardStyle] || cardStyles.modern;

                    div.style.cssText = `
                        width: 70px; height: 95px;
                        background: ${card.faceUp ? 'white' : style.backColor};
                        border: ${style.borderWidth} solid ${isSelected ? '#ff0' : '#333'};
                        border-radius: ${style.borderRadius};
                        box-shadow: ${isSelected ? '0 0 10px #ff0' : '2px 2px 5px rgba(0,0,0,0.4)'};
                        position: relative;
                        user-select: none;
                        cursor: pointer;
                        color: ${SUIT_COLORS[card.suit]};
                        font-weight: ${style.fontWeight};
                        transition: box-shadow 0.2s, transform 0.1s;
                    `;

                    // Add hover effect only for classic style
                    if (currentCardStyle === 'classic' && card.faceUp) {
                        div.addEventListener('mouseenter', () => {
                            if (!isSelected) {
                                div.style.transform = 'translateY(-2px)';
                                div.style.boxShadow = '3px 5px 8px rgba(0,0,0,0.5)';
                            }
                        });
                        div.addEventListener('mouseleave', () => {
                            if (!isSelected) {
                                div.style.transform = 'translateY(0)';
                                div.style.boxShadow = '2px 2px 5px rgba(0,0,0,0.4)';
                            }
                        });
                    }

                    if (card.faceUp) {
                        const isFace = ['J', 'Q', 'K'].includes(card.rank);

                        // Different layouts for different card styles
                        if (currentCardStyle === 'simple') {
                            div.innerHTML = `
                                <div style="position: absolute; top: 3px; left: 4px; font-size: 11px; line-height: 1.2; pointer-events: none;">${card.rank}${card.suit}</div>
                                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: ${isFace ? '36px' : '24px'}; pointer-events: none;">${isFace ? card.rank : card.suit}</div>
                            `;
                        } else {
                            // Modern and Classic styles
                            div.innerHTML = `
                                <div style="position: absolute; top: 3px; left: 4px; font-size: 11px; line-height: 1.2; pointer-events: none;">${card.rank}<br>${card.suit}</div>
                                <div style="position: absolute; top: 3px; right: 4px; font-size: 11px; line-height: 1.2; text-align: right; pointer-events: none;">${card.rank}<br>${card.suit}</div>
                                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: ${isFace ? '42px' : '26px'}; pointer-events: none;">${isFace ? card.rank : card.suit}</div>
                                <div style="position: absolute; bottom: 3px; left: 4px; font-size: 11px; line-height: 1.2; pointer-events: none;">${card.rank}<br>${card.suit}</div>
                                <div style="position: absolute; bottom: 3px; right: 4px; font-size: 11px; line-height: 1.2; text-align: right; pointer-events: none;">${card.rank}<br>${card.suit}</div>
                            `;
                        }
                    } else {
                        // Card back with different patterns based on style
                        const innerRadius = Math.max(0, parseInt(style.borderRadius) - 2);
                        div.innerHTML = `<div style="width: 100%; height: 100%; background: ${style.backPattern}; background-size: ${currentCardStyle === 'simple' ? '20px 20px' : 'auto'}; border-radius: ${innerRadius}px; pointer-events: none;"></div>`;
                    }

                    return div;
                }

                function renderEmptySlot(label = '') {
                    const div = document.createElement('div');
                    div.style.cssText = `
                        width: 70px; height: 95px;
                        border: 2px dashed rgba(255,255,255,0.4);
                        border-radius: 5px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 28px;
                        color: rgba(255,255,255,0.3);
                        cursor: pointer;
                        user-select: none;
                    `;
                    div.textContent = label;
                    return div;
                }

                // ===== MAIN RENDER =====
                function render() {
                    board.innerHTML = '';
                    scoreEl.textContent = score;
                    movesEl.textContent = moves;

                    // Stock pile
                    const stockDiv = document.createElement('div');
                    stockDiv.style.cssText = 'position: absolute; left: 15px; top: 10px;';
                    if (stock.length > 0) {
                        const stockCard = renderCard({ suit: '♠', rank: '', faceUp: false });
                        stockCard.onclick = drawFromStock;
                        stockDiv.appendChild(stockCard);
                    } else {
                        const emptyStock = renderEmptySlot('↻');
                        emptyStock.onclick = drawFromStock;
                        stockDiv.appendChild(emptyStock);
                    }
                    board.appendChild(stockDiv);

                    // Waste pile
                    const wasteDiv = document.createElement('div');
                    wasteDiv.style.cssText = 'position: absolute; left: 105px; top: 10px;';
                    if (waste.length > 0) {
                        const topWaste = waste[waste.length - 1];
                        const isSelected = selectedSource && selectedSource.type === 'waste';
                        const wasteCard = renderCard(topWaste, isSelected);
                        wasteCard.onclick = () => {
                            if (!selectedCards) {
                                // Try auto-move to foundation first
                                if (!tryAutoMoveToFoundation(topWaste, 'waste', null)) {
                                    // If can't auto-move, select it
                                    selectedCards = [topWaste];
                                    selectedSource = { type: 'waste' };
                                    render();
                                }
                            }
                        };
                        wasteDiv.appendChild(wasteCard);
                    } else {
                        wasteDiv.appendChild(renderEmptySlot());
                    }
                    board.appendChild(wasteDiv);

                    // Foundations
                    for (let i = 0; i < 4; i++) {
                        const foundDiv = document.createElement('div');
                        foundDiv.style.cssText = `position: absolute; left: ${330 + i * 90}px; top: 10px;`;

                        if (foundations[i].length > 0) {
                            const topCard = foundations[i][foundations[i].length - 1];
                            const card = renderCard(topCard);
                            foundDiv.appendChild(card);
                        } else {
                            const empty = renderEmptySlot(SUITS[i]);
                            empty.onclick = () => {
                                if (selectedCards && selectedCards.length === 1 && canPlaceOnFoundation(selectedCards[0], i)) {
                                    moveCard(selectedCards, selectedSource.type, selectedSource.index, 'foundation', i);
                                }
                            };
                            foundDiv.appendChild(empty);
                        }
                        board.appendChild(foundDiv);
                    }

                    // Tableau piles
                    for (let i = 0; i < 7; i++) {
                        const pileDiv = document.createElement('div');
                        pileDiv.style.cssText = `position: absolute; left: ${15 + i * 90}px; top: 125px;`;

                        if (tableau[i].length === 0) {
                            const empty = renderEmptySlot('K');
                            empty.onclick = () => {
                                if (selectedCards && canPlaceOnTableau(selectedCards[0], i)) {
                                    moveCard(selectedCards, selectedSource.type, selectedSource.index, 'tableau', i);
                                }
                            };
                            pileDiv.appendChild(empty);
                        } else {
                            tableau[i].forEach((card, idx) => {
                                const cardDiv = document.createElement('div');
                                cardDiv.style.cssText = `position: absolute; top: ${idx * 22}px; left: 0;`;

                                const isInSelection = selectedSource && selectedSource.type === 'tableau' &&
                                                      selectedSource.index === i &&
                                                      selectedCards && selectedCards.includes(card);

                                const cardEl = renderCard(card, isInSelection);

                                if (card.faceUp) {
                                    cardEl.onclick = (e) => {
                                        e.stopPropagation();

                                        if (selectedCards && selectedSource.type !== 'tableau' ||
                                            (selectedSource && selectedSource.type === 'tableau' && selectedSource.index !== i)) {
                                            // Try to place selected cards here
                                            if (canPlaceOnTableau(selectedCards[0], i)) {
                                                moveCard(selectedCards, selectedSource.type, selectedSource.index, 'tableau', i);
                                            } else {
                                                selectedCards = null;
                                                selectedSource = null;
                                                render();
                                            }
                                        } else {
                                            // Check if this is the top card and if it's alone
                                            const cardIndex = tableau[i].indexOf(card);
                                            const cardsToMove = tableau[i].slice(cardIndex);

                                            // If single card, try auto-move to foundation
                                            if (cardsToMove.length === 1 && !tryAutoMoveToFoundation(card, 'tableau', i)) {
                                                // If can't auto-move, select it
                                                if (isValidSequence(cardsToMove)) {
                                                    selectedCards = cardsToMove;
                                                    selectedSource = { type: 'tableau', index: i };
                                                    render();
                                                }
                                            } else if (cardsToMove.length > 1) {
                                                // Multiple cards, just select them
                                                if (isValidSequence(cardsToMove)) {
                                                    selectedCards = cardsToMove;
                                                    selectedSource = { type: 'tableau', index: i };
                                                    render();
                                                }
                                            }
                                        }
                                    };
                                }

                                cardDiv.appendChild(cardEl);
                                pileDiv.appendChild(cardDiv);
                            });
                        }

                        // Click on empty area to place cards
                        pileDiv.onclick = (e) => {
                            if (e.target === pileDiv && selectedCards && tableau[i].length > 0) {
                                if (canPlaceOnTableau(selectedCards[0], i)) {
                                    moveCard(selectedCards, selectedSource.type, selectedSource.index, 'tableau', i);
                                }
                            }
                        };

                        board.appendChild(pileDiv);
                    }

                    // Click anywhere to deselect
                    board.onclick = (e) => {
                        if (e.target === board && selectedCards) {
                            selectedCards = null;
                            selectedSource = null;
                            render();
                        }
                    };
                }

                // Menu action handlers
                document.querySelectorAll('[data-action]').forEach(option => {
                    option.addEventListener('click', () => {
                        const action = option.dataset.action;
                        if (action === 'new-game') {
                            dealCards();
                        }
                        // Close dropdown
                        document.querySelectorAll('.sol-dropdown').forEach(d => d.style.display = 'none');
                    });
                });

                // Theme change handlers
                document.querySelectorAll('[data-theme]').forEach(option => {
                    option.addEventListener('click', () => {
                        const theme = option.dataset.theme;
                        const themes = {
                            classic: '#008000',
                            blue: '#000080',
                            burgundy: '#800020',
                            forest: '#0d5c0d',
                            slate: '#2f4f4f'
                        };
                        currentTheme = themes[theme];
                        container.style.background = currentTheme;
                        // Close dropdown
                        document.querySelectorAll('.sol-dropdown').forEach(d => d.style.display = 'none');
                    });
                });

                // Card style change handlers
                document.querySelectorAll('[data-card]').forEach(option => {
                    option.addEventListener('click', () => {
                        currentCardStyle = option.dataset.card;
                        render(); // Re-render to apply new card style
                        // Close dropdown
                        document.querySelectorAll('.sol-dropdown').forEach(d => d.style.display = 'none');
                    });
                });

                dealCards();
            }, 100);
        }
    });

    // =====================
    // TETRIS - RETRO EDITION
    // =====================
    WindowManager.registerApp({
        id: 'tetris',
        title: 'Tetris',
        icon: '<img src="tetris.png" style="width: 16px; height: 16px; vertical-align: middle;">',
        launch() {
            const canvasId = 'tetris-canvas-' + Date.now();
            const win = WindowManager.createWindow({
                title: 'TETRIS - RETRO EDITION',
                icon: '<img src="tetris.png" style="width: 16px; height: 16px; vertical-align: middle;">',
                width: 600,
                height: 600,
                resizable: false,
                content: `
                    <div style="background: #000; padding: 15px; height: 100%; display: flex; gap: 15px; box-sizing: border-box;">
                        <canvas id="${canvasId}" width="300" height="500" style="border: 4px solid #0f0; box-shadow: 0 0 20px #0f0; display: block;"></canvas>
                        <div style="color: #0f0; font-family: 'Courier New', monospace; width: 220px;">
                            <div style="font-size: 20px; font-weight: bold; margin-bottom: 15px; text-shadow: 0 0 10px #0f0;">SCORE</div>
                            <div id="score-display-${canvasId}" style="font-size: 28px; margin-bottom: 25px; text-shadow: 0 0 10px #0f0;">0</div>
                            <div style="font-size: 16px; margin-bottom: 8px;">LEVEL: <span id="level-display-${canvasId}">1</span></div>
                            <div style="font-size: 16px; margin-bottom: 25px;">LINES: <span id="lines-display-${canvasId}">0</span></div>
                            <div style="font-size: 14px; margin-top: 40px; line-height: 1.6;">
                                <div style="margin-bottom: 8px; color: #ff0; font-weight: bold;">CONTROLS:</div>
                                <div>← → MOVE</div>
                                <div>↑ ROTATE</div>
                                <div>↓ SOFT DROP</div>
                                <div>SPACE HARD DROP</div>
                                <div>P PAUSE</div>
                                <div>R RESTART</div>
                            </div>
                        </div>
                    </div>
                `
            });

            setTimeout(() => {
                const canvas = document.getElementById(canvasId);
                if (!canvas) return;

                const ctx = canvas.getContext('2d');

                // Bigger retro field
                const COLS = 12;
                const ROWS = 20;
                const BLOCK = 25;

                const scoreDisplay = document.getElementById(`score-display-${canvasId}`);
                const levelDisplay = document.getElementById(`level-display-${canvasId}`);
                const linesDisplay = document.getElementById(`lines-display-${canvasId}`);

                // Simple solid blocks - no complicated shapes
                const PIECES = [
                    [[1,1,1,1]],                    // I
                    [[1,1],[1,1]],                  // O
                    [[0,1,0],[1,1,1]],              // T
                    [[1,1,0],[0,1,1]],              // Z
                    [[0,1,1],[1,1,0]],              // S
                    [[1,0,0],[1,1,1]],              // J
                    [[0,0,1],[1,1,1]]               // L
                ];

                const COLORS = ['#0ff', '#ff0', '#f0f', '#f00', '#0f0', '#00f', '#f80'];

                let grid = [];
                let piece, pieceX, pieceY, pieceColor;
                let score = 0, level = 1, linesCleared = 0;
                let gameOver = false;
                let paused = false;
                let lastTime = 0;
                let dropTime = 0;
                let dropSpeed = 800;

                function init() {
                    grid = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
                    score = 0;
                    level = 1;
                    linesCleared = 0;
                    gameOver = false;
                    paused = false;
                    dropSpeed = 800;
                    spawnPiece();
                    updateDisplays();
                }

                function spawnPiece() {
                    const index = Math.floor(Math.random() * PIECES.length);
                    piece = PIECES[index].map(row => [...row]);
                    pieceColor = COLORS[index];
                    pieceX = Math.floor((COLS - piece[0].length) / 2);
                    pieceY = 0;

                    if (collision(0, 0)) {
                        gameOver = true;
                    }
                }

                function collision(dx, dy, testPiece) {
                    const p = testPiece || piece;
                    for (let y = 0; y < p.length; y++) {
                        for (let x = 0; x < p[y].length; x++) {
                            if (p[y][x]) {
                                const newX = pieceX + x + dx;
                                const newY = pieceY + y + dy;

                                if (newX < 0 || newX >= COLS || newY >= ROWS) return true;
                                if (newY >= 0 && grid[newY][newX]) return true;
                            }
                        }
                    }
                    return false;
                }

                function rotate() {
                    const rotated = piece[0].map((_, i) => piece.map(row => row[i]).reverse());

                    // Try normal rotation
                    if (!collision(0, 0, rotated)) {
                        piece = rotated;
                        return;
                    }

                    // Wall kick left
                    if (!collision(-1, 0, rotated)) {
                        pieceX--;
                        piece = rotated;
                        return;
                    }

                    // Wall kick right
                    if (!collision(1, 0, rotated)) {
                        pieceX++;
                        piece = rotated;
                        return;
                    }

                    // Wall kick left 2
                    if (!collision(-2, 0, rotated)) {
                        pieceX -= 2;
                        piece = rotated;
                        return;
                    }

                    // Wall kick right 2
                    if (!collision(2, 0, rotated)) {
                        pieceX += 2;
                        piece = rotated;
                    }
                }

                function lock() {
                    for (let y = 0; y < piece.length; y++) {
                        for (let x = 0; x < piece[y].length; x++) {
                            if (piece[y][x] && pieceY + y >= 0) {
                                grid[pieceY + y][pieceX + x] = pieceColor;
                            }
                        }
                    }

                    clearFullLines();
                    spawnPiece();
                }

                function clearFullLines() {
                    let cleared = 0;
                    for (let y = ROWS - 1; y >= 0; y--) {
                        if (grid[y].every(cell => cell)) {
                            grid.splice(y, 1);
                            grid.unshift(Array(COLS).fill(0));
                            cleared++;
                            y++;
                        }
                    }

                    if (cleared > 0) {
                        linesCleared += cleared;
                        score += cleared * cleared * 100;
                        level = Math.floor(linesCleared / 10) + 1;
                        dropSpeed = Math.max(100, 800 - level * 50);
                        updateDisplays();
                    }
                }

                function updateDisplays() {
                    if (scoreDisplay) scoreDisplay.textContent = score;
                    if (levelDisplay) levelDisplay.textContent = level;
                    if (linesDisplay) linesDisplay.textContent = linesCleared;
                }

                function draw() {
                    // Clear with retro green glow
                    ctx.fillStyle = '#000';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // Draw grid
                    ctx.strokeStyle = '#0f0';
                    ctx.globalAlpha = 0.1;
                    for (let x = 0; x <= COLS; x++) {
                        ctx.beginPath();
                        ctx.moveTo(x * BLOCK, 0);
                        ctx.lineTo(x * BLOCK, ROWS * BLOCK);
                        ctx.stroke();
                    }
                    for (let y = 0; y <= ROWS; y++) {
                        ctx.beginPath();
                        ctx.moveTo(0, y * BLOCK);
                        ctx.lineTo(COLS * BLOCK, y * BLOCK);
                        ctx.stroke();
                    }
                    ctx.globalAlpha = 1;

                    // Draw locked blocks
                    for (let y = 0; y < ROWS; y++) {
                        for (let x = 0; x < COLS; x++) {
                            if (grid[y][x]) {
                                drawBlock(x, y, grid[y][x]);
                            }
                        }
                    }

                    // Draw current piece
                    if (piece && !gameOver) {
                        for (let y = 0; y < piece.length; y++) {
                            for (let x = 0; x < piece[y].length; x++) {
                                if (piece[y][x]) {
                                    drawBlock(pieceX + x, pieceY + y, pieceColor);
                                }
                            }
                        }
                    }

                    // Game over
                    if (gameOver) {
                        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                        ctx.fillRect(0, canvas.height / 2 - 60, canvas.width, 120);

                        ctx.fillStyle = '#f00';
                        ctx.font = 'bold 48px "Courier New"';
                        ctx.textAlign = 'center';
                        ctx.shadowColor = '#f00';
                        ctx.shadowBlur = 20;
                        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);

                        ctx.fillStyle = '#0f0';
                        ctx.font = '24px "Courier New"';
                        ctx.shadowBlur = 10;
                        ctx.fillText('Press R to Restart', canvas.width / 2, canvas.height / 2 + 40);
                        ctx.shadowBlur = 0;
                        ctx.textAlign = 'left';
                    }

                    // Paused
                    if (paused && !gameOver) {
                        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                        ctx.fillRect(0, canvas.height / 2 - 60, canvas.width, 120);

                        ctx.fillStyle = '#ff0';
                        ctx.font = 'bold 48px "Courier New"';
                        ctx.textAlign = 'center';
                        ctx.shadowColor = '#ff0';
                        ctx.shadowBlur = 20;
                        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);

                        ctx.fillStyle = '#0f0';
                        ctx.font = '24px "Courier New"';
                        ctx.shadowBlur = 10;
                        ctx.fillText('Press P to Resume', canvas.width / 2, canvas.height / 2 + 40);
                        ctx.shadowBlur = 0;
                        ctx.textAlign = 'left';
                    }
                }

                function drawBlock(x, y, color) {
                    // Classic 3D retro block style
                    const bx = x * BLOCK;
                    const by = y * BLOCK;

                    // Main block
                    ctx.fillStyle = color;
                    ctx.fillRect(bx, by, BLOCK, BLOCK);

                    // Lighter top-left bevel (highlight)
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                    ctx.fillRect(bx, by, BLOCK, 3);
                    ctx.fillRect(bx, by, 3, BLOCK);

                    // Darker bottom-right bevel (shadow)
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
                    ctx.fillRect(bx, by + BLOCK - 3, BLOCK, 3);
                    ctx.fillRect(bx + BLOCK - 3, by, 3, BLOCK);

                    // Black outline for pixelated look
                    ctx.strokeStyle = '#000';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(bx + 0.5, by + 0.5, BLOCK - 1, BLOCK - 1);
                }

                function gameLoop(time = 0) {
                    const dt = time - lastTime;
                    lastTime = time;

                    if (!gameOver && !paused) {
                        dropTime += dt;
                        if (dropTime > dropSpeed) {
                            if (!collision(0, 1)) {
                                pieceY++;
                            } else {
                                lock();
                            }
                            dropTime = 0;
                        }
                    }

                    draw();
                    requestAnimationFrame(gameLoop);
                }

                const keyHandler = (e) => {
                    // Handle restart - works anytime
                    if (e.key === 'r' || e.key === 'R') {
                        e.preventDefault();
                        init();
                        return;
                    }

                    // Can't do anything else if game is over
                    if (gameOver) return;

                    // Handle pause
                    if (e.key === 'p' || e.key === 'P') {
                        e.preventDefault();
                        paused = !paused;
                        draw();
                        return;
                    }

                    // Don't allow movement when paused
                    if (paused) return;

                    switch(e.key) {
                        case 'ArrowLeft':
                            e.preventDefault();
                            if (!collision(-1, 0)) pieceX--;
                            break;
                        case 'ArrowRight':
                            e.preventDefault();
                            if (!collision(1, 0)) pieceX++;
                            break;
                        case 'ArrowDown':
                            e.preventDefault();
                            if (!collision(0, 1)) {
                                pieceY++;
                            }
                            break;
                        case 'ArrowUp':
                            e.preventDefault();
                            rotate();
                            break;
                        case ' ':
                            e.preventDefault();
                            while (!collision(0, 1)) {
                                pieceY++;
                            }
                            lock();
                            break;
                    }
                    draw();
                };

                document.addEventListener('keydown', keyHandler);

                win.config.onClose = () => {
                    document.removeEventListener('keydown', keyHandler);
                };

                init();
                gameLoop();
            }, 100);
        }
    });

    // =====================
    // MINESWEEPER
    // =====================
    // Global difficulty state
    if (!window.minesweeperDifficulty) {
        window.minesweeperDifficulty = 'beginner';
    }

    WindowManager.registerApp({
        id: 'minesweeper',
        title: 'Minesweeper',
        icon: '💣',
        launch() {
            // Difficulty levels
            const difficulties = {
                beginner: { gridSize: 9, mineCount: 10, width: 259, height: 395 },
                intermediate: { gridSize: 16, mineCount: 40, width: 434, height: 570 },
                expert: { gridSize: 20, mineCount: 70, width: 534, height: 670 }
            };

            let currentDifficulty = window.minesweeperDifficulty;
            let config = difficulties[currentDifficulty];
            let gridSize = config.gridSize;
            let mineCount = config.mineCount;

            // Initialize grid
            const grid = [];
            const mines = new Set();

            // Place mines randomly
            while (mines.size < mineCount) {
                const pos = Math.floor(Math.random() * (gridSize * gridSize));
                mines.add(pos);
            }

            // Create grid with mine counts
            for (let i = 0; i < gridSize * gridSize; i++) {
                const row = Math.floor(i / gridSize);
                const col = i % gridSize;

                if (mines.has(i)) {
                    grid[i] = { mine: true, revealed: false, flagged: false };
                } else {
                    // Count adjacent mines
                    let count = 0;
                    for (let dr = -1; dr <= 1; dr++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            const nr = row + dr;
                            const nc = col + dc;
                            const ni = nr * gridSize + nc;
                            if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize && mines.has(ni)) {
                                count++;
                            }
                        }
                    }
                    grid[i] = { mine: false, count: count, revealed: false, flagged: false };
                }
            }

            // Generate HTML
            let cellsHTML = '';
            for (let i = 0; i < gridSize * gridSize; i++) {
                cellsHTML += `<div class="mine-cell" data-index="${i}"></div>`;
            }

            const win = WindowManager.createWindow({
                title: 'Minesweeper',
                icon: '💣',
                width: config.width,
                height: config.height,
                resizable: false,
                content: `
                    <div class="minesweeper-game" style="height: 100%; box-sizing: border-box; padding: 10px; width: 100%; overflow: hidden; display: flex; flex-direction: column;">
                        <div class="difficulty-selector" style="margin-bottom: 6px; display: flex; gap: 5px; justify-content: center;">
                            <button class="difficulty-btn ${currentDifficulty === 'beginner' ? 'active' : ''}" data-level="beginner">Beginner (9x9)</button>
                            <button class="difficulty-btn ${currentDifficulty === 'intermediate' ? 'active' : ''}" data-level="intermediate">Intermediate (16x16)</button>
                            <button class="difficulty-btn ${currentDifficulty === 'expert' ? 'active' : ''}" data-level="expert">Expert (20x20)</button>
                        </div>
                        <div class="minesweeper-header" style="margin-bottom: 6px;">
                            <div class="mine-counter">${String(mineCount).padStart(3, '0')}</div>
                            <button class="reset-button">🙂</button>
                            <div class="mine-timer">000</div>
                        </div>
                        <div class="minesweeper-grid" style="grid-template-columns: repeat(${gridSize}, 25px); display: grid;">
                            ${cellsHTML}
                        </div>
                    </div>
                `
            });

            // Add game logic
            setTimeout(() => {
                const windowContent = win.element.querySelector('.window-content');
                const cells = windowContent.querySelectorAll('.mine-cell');
                const resetButton = windowContent.querySelector('.reset-button');
                const mineCounter = windowContent.querySelector('.mine-counter');
                const timerDisplay = windowContent.querySelector('.mine-timer');
                let flagCount = 0;
                let gameOver = false;
                let gameStarted = false;
                let timerInterval = null;
                let seconds = 0;

                // Start timer
                function startTimer() {
                    if (!gameStarted) {
                        gameStarted = true;
                        timerInterval = setInterval(() => {
                            if (!gameOver) {
                                seconds++;
                                if (timerDisplay) {
                                    timerDisplay.textContent = String(Math.min(seconds, 999)).padStart(3, '0');
                                }
                            }
                        }, 1000);
                    }
                }

                // Check win condition
                function checkWin() {
                    const nonMineCount = gridSize * gridSize - mineCount;
                    const revealedCount = grid.filter(cell => !cell.mine && cell.revealed).length;

                    if (revealedCount === nonMineCount) {
                        gameOver = true;
                        if (timerInterval) clearInterval(timerInterval);
                        if (resetButton) resetButton.textContent = '😎';

                        // Flag all remaining mines
                        grid.forEach((cell, i) => {
                            if (cell.mine && !cell.flagged) {
                                cell.flagged = true;
                                cells[i].classList.add('flagged');
                            }
                        });

                        if (mineCounter) {
                            mineCounter.textContent = '000';
                        }
                    }
                }

                // Reveal cell function
                function revealCell(index) {
                    if (gameOver || grid[index].revealed || grid[index].flagged) return;

                    startTimer();

                    grid[index].revealed = true;
                    cells[index].classList.add('revealed');

                    if (grid[index].mine) {
                        // Game over - hit a mine
                        cells[index].classList.add('mine');
                        gameOver = true;
                        if (timerInterval) clearInterval(timerInterval);
                        if (resetButton) resetButton.textContent = '😵';

                        // Reveal all mines
                        grid.forEach((cell, i) => {
                            if (cell.mine) {
                                cells[i].classList.add('mine');
                            }
                        });
                    } else {
                        // Show count
                        if (grid[index].count > 0) {
                            cells[index].textContent = grid[index].count;
                            cells[index].setAttribute('data-count', grid[index].count);
                        } else {
                            // Auto-reveal adjacent cells if count is 0
                            const row = Math.floor(index / gridSize);
                            const col = index % gridSize;
                            for (let dr = -1; dr <= 1; dr++) {
                                for (let dc = -1; dc <= 1; dc++) {
                                    const nr = row + dr;
                                    const nc = col + dc;
                                    const ni = nr * gridSize + nc;
                                    if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize) {
                                        setTimeout(() => revealCell(ni), 10);
                                    }
                                }
                            }
                        }

                        // Check if player won
                        checkWin();
                    }
                }

                // Cell click handlers
                cells.forEach((cell, index) => {
                    // Left click - reveal
                    cell.addEventListener('click', () => {
                        if (!gameOver) {
                            revealCell(index);
                        }
                    });

                    // Right click - flag
                    cell.addEventListener('contextmenu', (e) => {
                        e.preventDefault();
                        if (!gameOver && !grid[index].revealed) {
                            grid[index].flagged = !grid[index].flagged;
                            cell.classList.toggle('flagged');

                            flagCount += grid[index].flagged ? 1 : -1;
                            if (mineCounter) {
                                mineCounter.textContent = String(mineCount - flagCount).padStart(3, '0');
                            }
                        }
                    });
                });

                // Difficulty buttons
                const difficultyBtns = windowContent.querySelectorAll('.difficulty-btn');
                difficultyBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const level = btn.getAttribute('data-level');
                        if (level !== currentDifficulty) {
                            if (timerInterval) clearInterval(timerInterval);
                            // Save the difficulty globally
                            window.minesweeperDifficulty = level;
                            WindowManager.closeWindow(win);
                            // Launch new game with selected difficulty
                            setTimeout(() => {
                                WindowManager.launchApp('minesweeper');
                            }, 50);
                        }
                    });
                });

                // Reset button
                if (resetButton) {
                    resetButton.addEventListener('click', () => {
                        if (timerInterval) clearInterval(timerInterval);
                        WindowManager.closeWindow(win);
                        WindowManager.launchApp('minesweeper');
                    });
                }

                // Clean up timer on window close
                win.config.onClose = () => {
                    if (timerInterval) clearInterval(timerInterval);
                };
            }, 100);
        }
    });

    // =====================
    // CALCULATOR
    // =====================
    WindowManager.registerApp({
        id: 'calculator',
        title: 'Calculator',
        icon: '🔢',
        launch() {
            let expression = '';
            let result = '0';
            let justCalculated = false;

            const win = WindowManager.createWindow({
                title: 'Calculator',
                icon: '🔢',
                width: 300,
                height: 450,
                content: `
                    <style>
                        .calc-window-content {
                            background: #000;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            padding: 5px;
                            overflow: hidden;
                        }

                        .calculator-container {
                            background: #1a1a1a;
                            border: 3px solid #00ff00;
                            box-shadow:
                                0 0 20px rgba(0, 255, 0, 0.3),
                                inset 0 0 40px rgba(0, 255, 0, 0.05);
                            padding: 8px;
                            border-radius: 5px;
                            width: 100%;
                            max-width: 280px;
                            animation: flicker-container 0.1s infinite alternate;
                        }

                        @keyframes flicker-container {
                            0%, 100% { opacity: 1; }
                            50% { opacity: 0.98; }
                        }

                        .calculator-header {
                            background: #000;
                            border: 2px solid #00ff00;
                            padding: 3px;
                            text-align: center;
                            margin-bottom: 8px;
                            box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
                        }

                        .calculator-title {
                            color: #00ff00;
                            font-size: 10px;
                            letter-spacing: 1px;
                            text-shadow: 0 0 10px #00ff00;
                            animation: text-flicker 0.15s infinite alternate;
                        }

                        @keyframes text-flicker {
                            0%, 100% { opacity: 1; text-shadow: 0 0 10px #00ff00; }
                            50% { opacity: 0.95; text-shadow: 0 0 8px #00ff00; }
                        }

                        .calculator-screen {
                            background: #000;
                            border: 2px solid #00ff00;
                            padding: 8px 8px;
                            margin-bottom: 8px;
                            min-height: 55px;
                            position: relative;
                            overflow: hidden;
                            box-shadow:
                                inset 0 0 20px rgba(0, 255, 0, 0.2),
                                0 0 15px rgba(0, 255, 0, 0.4);
                        }

                        .calculator-screen::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: linear-gradient(
                                transparent 50%,
                                rgba(0, 255, 0, 0.03) 50%
                            );
                            background-size: 100% 4px;
                            pointer-events: none;
                            animation: scanline 8s linear infinite;
                        }

                        @keyframes scanline {
                            0% { transform: translateY(0); }
                            100% { transform: translateY(100%); }
                        }

                        .calculator-screen::after {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: repeating-linear-gradient(
                                0deg,
                                rgba(0, 0, 0, 0.1),
                                rgba(0, 0, 0, 0.1) 1px,
                                transparent 1px,
                                transparent 2px
                            );
                            pointer-events: none;
                        }

                        .screen-expression {
                            color: #00ff00;
                            font-size: 12px;
                            min-height: 14px;
                            text-align: right;
                            opacity: 0.7;
                            text-shadow: 0 0 5px #00ff00;
                            margin-bottom: 3px;
                            font-family: 'Courier New', monospace;
                        }

                        .screen-result {
                            color: #00ff00;
                            font-size: 22px;
                            text-align: right;
                            text-shadow: 0 0 10px #00ff00;
                            word-break: break-all;
                            animation: glow-pulse 2s infinite alternate;
                            font-family: 'Courier New', monospace;
                        }

                        @keyframes glow-pulse {
                            0% { text-shadow: 0 0 10px #00ff00; }
                            100% { text-shadow: 0 0 15px #00ff00, 0 0 20px #00ff00; }
                        }

                        .calculator-buttons {
                            display: grid;
                            grid-template-columns: repeat(4, 1fr);
                            gap: 6px;
                        }

                        .calc-btn {
                            background: #000;
                            border: 2px solid #00ff00;
                            color: #00ff00;
                            font-size: 16px;
                            font-family: 'Courier New', monospace;
                            padding: 12px;
                            cursor: pointer;
                            transition: all 0.1s;
                            box-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
                            position: relative;
                            overflow: hidden;
                        }

                        .calc-btn::before {
                            content: '';
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            width: 0;
                            height: 0;
                            background: rgba(0, 255, 0, 0.2);
                            border-radius: 50%;
                            transform: translate(-50%, -50%);
                            transition: width 0.3s, height 0.3s;
                        }

                        .calc-btn:hover {
                            background: rgba(0, 255, 0, 0.1);
                            box-shadow:
                                0 0 15px rgba(0, 255, 0, 0.6),
                                inset 0 0 10px rgba(0, 255, 0, 0.2);
                            transform: scale(1.05);
                        }

                        .calc-btn:hover::before {
                            width: 100%;
                            height: 100%;
                        }

                        .calc-btn:active {
                            transform: scale(0.95);
                            box-shadow:
                                0 0 10px rgba(0, 255, 0, 0.8),
                                inset 0 0 15px rgba(0, 255, 0, 0.3);
                            animation: glitch-btn 0.1s;
                        }

                        @keyframes glitch-btn {
                            0%, 100% { transform: scale(0.95); }
                            25% { transform: scale(0.93) translate(-1px, 1px); }
                            75% { transform: scale(0.93) translate(1px, -1px); }
                        }

                        .calc-btn.operator {
                            background: #001100;
                            border-color: #00cc00;
                            color: #00cc00;
                        }

                        .calc-btn.equals {
                            grid-column: span 4;
                            background: #002200;
                            border-color: #00ff00;
                            font-weight: bold;
                        }

                        .calc-btn.clear,
                        .calc-btn.clear-entry {
                            background: #110000;
                            border-color: #ff0000;
                            color: #ff0000;
                            box-shadow: 0 0 5px rgba(255, 0, 0, 0.3);
                        }

                        .calc-btn.clear:hover,
                        .calc-btn.clear-entry:hover {
                            background: rgba(255, 0, 0, 0.1);
                            box-shadow:
                                0 0 15px rgba(255, 0, 0, 0.6),
                                inset 0 0 10px rgba(255, 0, 0, 0.2);
                        }

                        .calc-btn.backspace,
                        .calc-btn.negate {
                            background: #110000;
                            border-color: #ff6600;
                            color: #ff6600;
                            box-shadow: 0 0 5px rgba(255, 102, 0, 0.3);
                        }

                        .calc-btn.backspace:hover,
                        .calc-btn.negate:hover {
                            background: rgba(255, 102, 0, 0.1);
                            box-shadow:
                                0 0 15px rgba(255, 102, 0, 0.6),
                                inset 0 0 10px rgba(255, 102, 0, 0.2);
                        }

                        @keyframes screen-shake {
                            0%, 100% { transform: translate(0, 0); }
                            25% { transform: translate(-2px, 2px); }
                            50% { transform: translate(2px, -2px); }
                            75% { transform: translate(-2px, -2px); }
                        }

                        .error-shake {
                            animation: screen-shake 0.2s;
                        }

                        .error-text {
                            color: #ff0000 !important;
                            text-shadow: 0 0 10px #ff0000 !important;
                            animation: error-blink 0.5s infinite;
                        }

                        @keyframes error-blink {
                            0%, 50%, 100% { opacity: 1; }
                            25%, 75% { opacity: 0.5; }
                        }
                    </style>

                    <div class="calc-window-content">
                        <div class="calculator-container">
                            <div class="calculator-header">
                                <div class="calculator-title">RETRO CALCULATOR v1.0</div>
                            </div>

                            <div class="calculator-screen" id="calc-screen">
                                <div class="screen-expression" id="calc-expression"></div>
                                <div class="screen-result" id="calc-result">0</div>
                            </div>

                            <div class="calculator-buttons">
                                <button class="calc-btn operator" data-value="%">%</button>
                                <button class="calc-btn clear-entry" data-action="clear-entry">CE</button>
                                <button class="calc-btn clear" data-action="clear">C</button>
                                <button class="calc-btn backspace" data-action="backspace">⌫</button>

                                <button class="calc-btn" data-value="7">7</button>
                                <button class="calc-btn" data-value="8">8</button>
                                <button class="calc-btn" data-value="9">9</button>
                                <button class="calc-btn operator" data-value="*">×</button>

                                <button class="calc-btn" data-value="4">4</button>
                                <button class="calc-btn" data-value="5">5</button>
                                <button class="calc-btn" data-value="6">6</button>
                                <button class="calc-btn operator" data-value="-">-</button>

                                <button class="calc-btn" data-value="1">1</button>
                                <button class="calc-btn" data-value="2">2</button>
                                <button class="calc-btn" data-value="3">3</button>
                                <button class="calc-btn operator" data-value="+">+</button>

                                <button class="calc-btn negate" data-action="negate">+/-</button>
                                <button class="calc-btn" data-value="0">0</button>
                                <button class="calc-btn" data-value=".">.</button>
                                <button class="calc-btn operator" data-value="/">/</button>

                                <button class="calc-btn equals" data-action="equals">=</button>
                            </div>
                        </div>
                    </div>
                `
            });

            // Now attach event listeners after DOM is created
            setTimeout(() => {
                const contentEl = win.element.querySelector('.window-content');
                const expressionEl = contentEl.querySelector('#calc-expression');
                const resultEl = contentEl.querySelector('#calc-result');
                const screenEl = contentEl.querySelector('#calc-screen');

                if (!expressionEl || !resultEl || !screenEl) {
                    console.error('Calculator elements not found');
                    return;
                }

                function handleButton(btn) {
                    const value = btn.getAttribute('data-value');
                    const action = btn.getAttribute('data-action');

                    if (value) {
                        appendValue(value);
                    } else if (action === 'clear') {
                        clear();
                    } else if (action === 'clear-entry') {
                        clearEntry();
                    } else if (action === 'backspace') {
                        backspace();
                    } else if (action === 'equals') {
                        calculate();
                    } else if (action === 'negate') {
                        negate();
                    }
                }

                function appendValue(value) {
                    if (justCalculated) {
                        if (/[+\-*\/%]/.test(value)) {
                            expression = result + value;
                            result = '0';
                        } else {
                            expression = value;
                            result = value;
                        }
                        justCalculated = false;
                    } else {
                        if (value === '.') {
                            const parts = expression.split(/[+\-*\/%]/);
                            const lastNumber = parts[parts.length - 1];
                            if (lastNumber.includes('.')) return;
                        }

                        if (/[+\-*\/%]/.test(value)) {
                            const lastChar = expression.slice(-1);
                            if (/[+\-*\/%]/.test(lastChar)) {
                                expression = expression.slice(0, -1) + value;
                                updateDisplay();
                                return;
                            }
                        }

                        expression += value;

                        if (!/[+\-*\/%]/.test(value)) {
                            const parts = expression.split(/[+\-*\/%]/);
                            result = parts[parts.length - 1] || '0';
                        }
                    }

                    updateDisplay();
                }

                function backspace() {
                    if (justCalculated) {
                        clear();
                        return;
                    }

                    if (expression.length > 0) {
                        expression = expression.slice(0, -1);

                        if (expression === '') {
                            result = '0';
                        } else {
                            const parts = expression.split(/[+\-*\/%]/);
                            result = parts[parts.length - 1] || '0';
                        }

                        updateDisplay();
                    }
                }

                function clear() {
                    expression = '';
                    result = '0';
                    justCalculated = false;
                    resultEl.classList.remove('error-text');
                    updateDisplay();
                }

                function clearEntry() {
                    // Clear only the current number being entered
                    if (justCalculated) {
                        clear();
                        return;
                    }

                    const parts = expression.split(/([+\-*\/%])/);
                    if (parts.length > 0) {
                        parts[parts.length - 1] = '';
                        expression = parts.join('');
                        result = '0';
                        updateDisplay();
                    }
                }

                function negate() {
                    // Toggle the sign of the current number
                    if (result === '0' || result === 'ERROR') return;

                    if (justCalculated) {
                        result = String(-parseFloat(result));
                        expression = result;
                        updateDisplay();
                    } else {
                        const parts = expression.split(/([+\-*\/%])/);
                        if (parts.length > 0) {
                            const lastPart = parts[parts.length - 1];
                            if (lastPart && /^-?\d*\.?\d+$/.test(lastPart)) {
                                const negated = String(-parseFloat(lastPart));
                                parts[parts.length - 1] = negated;
                                expression = parts.join('');
                                result = negated;
                                updateDisplay();
                            }
                        }
                    }
                }

                function calculate() {
                    if (expression === '') return;

                    try {
                        if (!/^[0-9+\-*\/%.()\s]+$/.test(expression)) {
                            throw new Error('Invalid expression');
                        }

                        const calcResult = Function('"use strict"; return (' + expression + ')')();

                        if (!isFinite(calcResult)) {
                            throw new Error('Math error');
                        }

                        result = String(Math.round(calcResult * 100000000) / 100000000);
                        justCalculated = true;
                        resultEl.classList.remove('error-text');

                    } catch (error) {
                        result = 'ERROR';
                        resultEl.classList.add('error-text');
                        screenEl.classList.add('error-shake');
                        setTimeout(() => {
                            screenEl.classList.remove('error-shake');
                        }, 200);
                        justCalculated = true;
                    }

                    updateDisplay();
                }

                function updateDisplay() {
                    expressionEl.textContent = expression || '';
                    resultEl.textContent = result;
                }

                function handleKeyboard(e) {
                    if (/[0-9+\-*\/%.]/.test(e.key)) {
                        e.preventDefault();
                        appendValue(e.key);
                    } else if (e.key === 'Enter') {
                        e.preventDefault();
                        calculate();
                    } else if (e.key === 'Backspace') {
                        e.preventDefault();
                        backspace();
                    } else if (e.key === 'Escape' || e.key === 'Delete') {
                        e.preventDefault();
                        clear();
                    }
                }

                contentEl.querySelectorAll('.calc-btn').forEach(btn => {
                    btn.addEventListener('click', () => handleButton(btn));
                });

                contentEl.addEventListener('keydown', handleKeyboard);
            }, 50);
        }
    });

    // =====================
    // CONTROL PANEL
    // =====================
    WindowManager.registerApp({
        id: 'controlpanel',
        title: 'Control Panel',
        icon: '⚙️',
        launch() {
            // Trigger VHS horror popup
            console.log('Control Panel clicked!');
            console.log('window.showVHSPopup exists:', typeof window.showVHSPopup);

            if (window.showVHSPopup) {
                console.log('Calling showVHSPopup...');
                window.showVHSPopup();
            } else {
                console.error('window.showVHSPopup is not defined!');
            }
        }
    });

    // =====================
    // RETRO BROWSER
    // =====================
    WindowManager.registerApp({
        id: 'browser',
        title: 'Internet Explorer',
        icon: '🌐',
        launch() {
            const browserId = 'browser-' + Date.now();
            const win = WindowManager.createWindow({
                title: 'Internet Explorer',
                icon: '🌐',
                width: 800,
                height: 600,
                content: `
                    <div style="display: flex; flex-direction: column; height: 100%; background: #c0c0c0; font-family: 'MS Sans Serif', Arial, sans-serif;">
                        <!-- Menu Bar -->
                        <div class="browser-menubar" style="background: #c0c0c0; border-bottom: 2px solid #808080; display: flex; font-size: 11px;">
                            <div class="menu-item" style="padding: 3px 8px; cursor: pointer; user-select: none;">File</div>
                            <div class="menu-item" style="padding: 3px 8px; cursor: pointer; user-select: none;">Edit</div>
                            <div class="menu-item" style="padding: 3px 8px; cursor: pointer; user-select: none;">View</div>
                            <div class="menu-item" style="padding: 3px 8px; cursor: pointer; user-select: none;">Favorites</div>
                            <div class="menu-item" style="padding: 3px 8px; cursor: pointer; user-select: none;">Tools</div>
                            <div class="menu-item" style="padding: 3px 8px; cursor: pointer; user-select: none;">Help</div>
                        </div>

                        <!-- Toolbar -->
                        <div style="background: #c0c0c0; padding: 4px; border-bottom: 2px solid #808080; display: flex; gap: 4px; align-items: center;">
                            <button class="btn-back" style="padding: 2px 6px; border: 2px outset #fff; background: #c0c0c0; cursor: pointer; font-size: 11px;" title="Back">◄</button>
                            <button class="btn-forward" style="padding: 2px 6px; border: 2px outset #fff; background: #c0c0c0; cursor: pointer; font-size: 11px;" title="Forward">►</button>
                            <button class="btn-refresh" style="padding: 2px 6px; border: 2px outset #fff; background: #c0c0c0; cursor: pointer; font-size: 11px;" title="Refresh">↻</button>
                            <button class="btn-home" style="padding: 2px 6px; border: 2px outset #fff; background: #c0c0c0; cursor: pointer; font-size: 11px;" title="Home">🏠</button>
                        </div>

                        <!-- Address Bar -->
                        <div style="background: #c0c0c0; padding: 4px; border-bottom: 2px solid #808080; display: flex; gap: 4px; align-items: center;">
                            <span style="font-size: 11px;">Address:</span>
                            <input type="text" class="browser-address" value="https://wiby.me/" style="flex: 1; padding: 2px 4px; border: 2px inset #808080; font-family: 'Courier New', monospace; font-size: 11px;">
                            <button class="btn-go" style="padding: 2px 8px; border: 2px outset #fff; background: #c0c0c0; cursor: pointer; font-size: 11px;">Go</button>
                        </div>

                        <!-- Browser Content -->
                        <iframe
                            class="browser-frame"
                            src="https://wiby.me/"
                            style="flex: 1; border: 2px inset #808080; margin: 2px; background: white;"
                            frameborder="0"
                        ></iframe>

                        <!-- Status Bar -->
                        <div style="background: #c0c0c0; border-top: 2px solid #fff; padding: 2px 6px; font-size: 11px; display: flex; gap: 10px;">
                            <span class="browser-status">🌐 Done</span>
                            <span style="margin-left: auto;">Internet</span>
                        </div>
                    </div>
                `
            });

            // Add functionality after window is created
            setTimeout(() => {
                const contentDiv = win.element.querySelector('.window-content');
                const iframe = contentDiv.querySelector('.browser-frame');
                const addressBar = contentDiv.querySelector('.browser-address');
                const statusBar = contentDiv.querySelector('.browser-status');
                const btnBack = contentDiv.querySelector('.btn-back');
                const btnForward = contentDiv.querySelector('.btn-forward');
                const btnRefresh = contentDiv.querySelector('.btn-refresh');
                const btnHome = contentDiv.querySelector('.btn-home');
                const btnGo = contentDiv.querySelector('.btn-go');

                const homeUrl = 'https://wiby.me/';

                // Navigation history
                let history = [homeUrl];
                let historyIndex = 0;

                // Menu bar hover effects
                const menuItems = contentDiv.querySelectorAll('.menu-item');
                menuItems.forEach(item => {
                    item.addEventListener('mouseenter', () => {
                        item.style.background = '#000080';
                        item.style.color = '#fff';
                    });
                    item.addEventListener('mouseleave', () => {
                        item.style.background = 'transparent';
                        item.style.color = '#000';
                    });
                    item.onclick = (e) => {
                        e.stopPropagation();
                        alert(`${item.textContent} menu - Coming soon!`);
                    };
                });

                // Load URL function
                function loadUrl(url) {
                    if (!url) return;
                    if (!url.startsWith('http://') && !url.startsWith('https://')) {
                        url = 'https://' + url;
                    }
                    statusBar.textContent = '🌐 Loading...';
                    iframe.src = url;
                    addressBar.value = url;
                    if (url !== history[historyIndex]) {
                        history = history.slice(0, historyIndex + 1);
                        history.push(url);
                        historyIndex = history.length - 1;
                    }
                }

                // Back button - use iframe's browser history
                if (btnBack) {
                    btnBack.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        try {
                            iframe.contentWindow.history.back();
                        } catch (err) {
                            // Cross-origin - fallback to manual history
                            if (historyIndex > 0) {
                                historyIndex--;
                                statusBar.textContent = '🌐 Loading...';
                                iframe.src = history[historyIndex];
                                addressBar.value = history[historyIndex];
                                // Reset styling when navigating back
                                addressBar.style.background = 'white';
                                addressBar.style.color = 'black';
                            }
                        }
                    });
                }

                // Forward button - use iframe's browser history
                if (btnForward) {
                    btnForward.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        try {
                            iframe.contentWindow.history.forward();
                        } catch (err) {
                            // Cross-origin - fallback to manual history
                            if (historyIndex < history.length - 1) {
                                historyIndex++;
                                statusBar.textContent = '🌐 Loading...';
                                iframe.src = history[historyIndex];
                                addressBar.value = history[historyIndex];
                                // Reset styling when navigating forward
                                addressBar.style.background = 'white';
                                addressBar.style.color = 'black';
                            }
                        }
                    });
                }

                // Refresh button - reload current page only (NEVER redirect to home)
                if (btnRefresh) {
                    btnRefresh.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        statusBar.textContent = '🌐 Refreshing...';
                        // Reload the current iframe source without changing URL
                        const currentSrc = iframe.src;
                        iframe.src = currentSrc;
                    });
                }

                // Home button - explicitly navigate to home page
                if (btnHome) {
                    btnHome.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        loadUrl(homeUrl);
                        // Reset styling when going home
                        addressBar.style.background = 'white';
                        addressBar.style.color = 'black';
                    });
                }

                // Go button
                if (btnGo) {
                    btnGo.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        loadUrl(addressBar.value);
                    });
                }

                // Address bar Enter key
                if (addressBar) {
                    addressBar.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            loadUrl(addressBar.value);
                        }
                    });
                }

                // Update status and address bar when page loads
                if (iframe) {
                    iframe.addEventListener('load', () => {
                        statusBar.textContent = '🌐 Done';

                        // Try to update address bar with current iframe URL
                        try {
                            // This will only work for same-origin pages
                            const currentUrl = iframe.contentWindow.location.href;
                            if (currentUrl && currentUrl !== 'about:blank') {
                                addressBar.value = currentUrl;
                                // Reset address bar styling for same-origin
                                addressBar.style.background = 'white';
                                addressBar.style.color = 'black';

                                // Update history if it's a new URL
                                if (currentUrl !== history[historyIndex]) {
                                    history = history.slice(0, historyIndex + 1);
                                    history.push(currentUrl);
                                    historyIndex = history.length - 1;
                                }
                            }
                        } catch (e) {
                            // Cross-origin - can't access iframe URL due to browser security
                            // Keep showing the last known URL with visual indicator
                            addressBar.style.background = '#ffffcc';
                            addressBar.style.color = '#666';
                            statusBar.textContent = '🌐 External site';
                        }
                    });
                }
            }, 150);
        }
    });
}
