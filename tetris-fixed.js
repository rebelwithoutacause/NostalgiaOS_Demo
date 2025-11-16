/**
 * TETRIS GAME - COMPLETE FIXED VERSION
 *
 * This implementation includes:
 * - Proper edge collision detection
 * - Wall kick system for rotation near edges
 * - All 7 standard Tetris pieces
 * - Standard Tetris controls and scoring
 */

// ==============================================
// GAME CONFIGURATION
// ==============================================
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

// ==============================================
// TETROMINO DEFINITIONS
// ==============================================
// All 7 standard Tetris pieces with their rotation states
const SHAPES = {
    I: [[1,1,1,1]],           // Horizontal I-piece
    O: [[1,1],[1,1]],         // Square O-piece
    T: [[0,1,0],[1,1,1]],     // T-piece
    S: [[0,1,1],[1,1,0]],     // S-piece
    Z: [[1,1,0],[0,1,1]],     // Z-piece
    J: [[1,0,0],[1,1,1]],     // J-piece
    L: [[0,0,1],[1,1,1]]      // L-piece
};

const COLORS = {
    I: '#00ffff',
    O: '#ffff00',
    T: '#ff00ff',
    S: '#00ff00',
    Z: '#ff0000',
    J: '#0000ff',
    L: '#ff8800'
};

// ==============================================
// GAME STATE
// ==============================================
let board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
let currentPiece = null;
let currentX = 0;
let currentY = 0;
let nextPiece = null;
let score = 0;
let level = 1;
let lines = 0;
let gameOver = false;
let paused = false;
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

// ==============================================
// PIECE GENERATION
// ==============================================

/**
 * Generates a random Tetris piece
 */
function randomPiece() {
    const pieces = 'IOJLSZT';
    const type = pieces[Math.floor(Math.random() * pieces.length)];
    return {
        type: type,
        shape: JSON.parse(JSON.stringify(SHAPES[type])), // Deep copy
        color: COLORS[type]
    };
}

/**
 * Creates a new piece at the top center of the board
 */
function newPiece() {
    if (!nextPiece) {
        nextPiece = randomPiece();
    }
    currentPiece = nextPiece;
    nextPiece = randomPiece();

    // Center the piece horizontally
    currentX = Math.floor(COLS / 2) - Math.floor(currentPiece.shape[0].length / 2);
    currentY = 0;

    // Check if game is over (piece can't spawn)
    if (collides(0, 0)) {
        gameOver = true;
    }
}

// ==============================================
// COLLISION DETECTION
// ==============================================

/**
 * Checks if the current piece would collide with walls or existing blocks
 *
 * @param {number} offsetX - Horizontal offset to check
 * @param {number} offsetY - Vertical offset to check
 * @param {array} shape - Optional shape to check (for rotation)
 * @returns {boolean} - True if collision detected
 */
function collides(offsetX = 0, offsetY = 0, shape = currentPiece.shape) {
    if (!currentPiece) return false;

    // Check each block in the piece
    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            // Only check filled blocks (skip empty cells in shape matrix)
            if (shape[y][x]) {
                const newX = currentX + x + offsetX;
                const newY = currentY + y + offsetY;

                // Check left/right wall collision
                if (newX < 0 || newX >= COLS) {
                    return true;
                }

                // Check floor collision
                if (newY >= ROWS) {
                    return true;
                }

                // Check collision with existing blocks (ignore blocks above board)
                if (newY >= 0 && board[newY][newX]) {
                    return true;
                }
            }
        }
    }

    return false;
}

// ==============================================
// ROTATION WITH WALL KICK
// ==============================================

/**
 * Rotates the current piece 90 degrees clockwise
 * Implements wall kick system: if rotation fails, tries shifting left/right
 *
 * Wall kick offsets are tried in order:
 * 1. No shift (standard rotation)
 * 2. Shift left by 1
 * 3. Shift right by 1
 * 4. Shift left by 2 (for I-piece)
 * 5. Shift right by 2 (for I-piece)
 * 6. Shift up by 1 (for rotations near floor)
 *
 * @returns {boolean} - True if rotation succeeded
 */
function rotate() {
    // Rotate the shape matrix 90 degrees clockwise
    const newShape = currentPiece.shape[0].map((_, i) =>
        currentPiece.shape.map(row => row[i]).reverse()
    );

    // Wall kick offsets to try (in priority order)
    const kickOffsets = [
        [0, 0],    // No shift (normal rotation)
        [-1, 0],   // Shift left
        [1, 0],    // Shift right
        [-2, 0],   // Shift left 2 (for I-piece at right wall)
        [2, 0],    // Shift right 2 (for I-piece at left wall)
        [0, -1],   // Shift up (for rotations near floor)
    ];

    // Try each kick offset
    for (const [kickX, kickY] of kickOffsets) {
        if (!collides(kickX, kickY, newShape)) {
            // Rotation succeeded with this offset
            currentPiece.shape = newShape;
            currentX += kickX;
            currentY += kickY;
            return true;
        }
    }

    // All kick attempts failed - rotation blocked
    return false;
}

// ==============================================
// MOVEMENT
// ==============================================

/**
 * Moves the piece left if possible
 */
function moveLeft() {
    if (!collides(-1, 0)) {
        currentX--;
        return true;
    }
    return false;
}

/**
 * Moves the piece right if possible
 */
function moveRight() {
    if (!collides(1, 0)) {
        currentX++;
        return true;
    }
    return false;
}

/**
 * Moves the piece down one row (soft drop)
 */
function drop() {
    if (!collides(0, 1)) {
        currentY++;
        return true;
    } else {
        // Piece has landed - lock it to the board
        merge();
        clearLines();
        newPiece();
        return false;
    }
}

/**
 * Instantly drops the piece to the bottom (hard drop)
 */
function hardDrop() {
    while (!collides(0, 1)) {
        currentY++;
    }
    // Lock piece immediately
    merge();
    clearLines();
    newPiece();
}

// ==============================================
// BOARD MANIPULATION
// ==============================================

/**
 * Merges the current piece into the board
 */
function merge() {
    currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                const boardY = currentY + y;
                const boardX = currentX + x;
                if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
                    board[boardY][boardX] = currentPiece.color;
                }
            }
        });
    });
}

/**
 * Clears completed lines and updates score
 */
function clearLines() {
    let linesCleared = 0;

    // Check each row from bottom to top
    for (let y = ROWS - 1; y >= 0; y--) {
        // Check if row is completely filled
        if (board[y].every(cell => cell !== 0)) {
            // Remove the filled row
            board.splice(y, 1);
            // Add empty row at top
            board.unshift(Array(COLS).fill(0));
            linesCleared++;
            y++; // Check same row index again (since rows shifted down)
        }
    }

    // Update score and level
    if (linesCleared > 0) {
        lines += linesCleared;
        score += linesCleared * 100 * level;
        level = Math.floor(lines / 10) + 1;
        dropInterval = Math.max(100, 1000 - (level * 50));

        // Save high score
        const highScore = localStorage.getItem('tetrisHighScore') || 0;
        if (score > highScore) {
            localStorage.setItem('tetrisHighScore', score);
        }
    }
}

// ==============================================
// DRAWING FUNCTIONS
// ==============================================

/**
 * Draws a single block with 3D effect
 */
function drawBlock(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

    // 3D bevel effect - light edge
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x * BLOCK_SIZE, y * BLOCK_SIZE + BLOCK_SIZE);
    ctx.lineTo(x * BLOCK_SIZE, y * BLOCK_SIZE);
    ctx.lineTo(x * BLOCK_SIZE + BLOCK_SIZE, y * BLOCK_SIZE);
    ctx.stroke();

    // 3D bevel effect - dark edge
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.moveTo(x * BLOCK_SIZE + BLOCK_SIZE, y * BLOCK_SIZE);
    ctx.lineTo(x * BLOCK_SIZE + BLOCK_SIZE, y * BLOCK_SIZE + BLOCK_SIZE);
    ctx.lineTo(x * BLOCK_SIZE, y * BLOCK_SIZE + BLOCK_SIZE);
    ctx.stroke();
}

/**
 * Draws the game board
 */
function drawBoard(ctx, canvas) {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw locked blocks
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            if (board[y][x]) {
                drawBlock(ctx, x, y, board[y][x]);
            }
        }
    }

    // Draw grid lines
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 1;
    for (let x = 0; x <= COLS; x++) {
        ctx.beginPath();
        ctx.moveTo(x * BLOCK_SIZE, 0);
        ctx.lineTo(x * BLOCK_SIZE, ROWS * BLOCK_SIZE);
        ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * BLOCK_SIZE);
        ctx.lineTo(COLS * BLOCK_SIZE, y * BLOCK_SIZE);
        ctx.stroke();
    }
}

/**
 * Draws the current falling piece
 */
function drawPiece(ctx) {
    if (!currentPiece) return;

    const shape = currentPiece.shape;
    const color = currentPiece.color;

    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x]) {
                drawBlock(ctx, currentX + x, currentY + y, color);
            }
        }
    }
}

/**
 * Draws UI elements (score, level, lines)
 */
function drawUI(ctx, canvas) {
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px "Courier New", monospace';
    ctx.fillText('SCORE: ' + score, 10, canvas.height - 70);
    ctx.fillText('LEVEL: ' + level, 10, canvas.height - 50);
    ctx.fillText('LINES: ' + lines, 10, canvas.height - 30);
}

/**
 * Draws game over screen
 */
function drawGameOver(ctx, canvas) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 200, canvas.width, 100);

    ctx.fillStyle = '#f00';
    ctx.font = 'bold 32px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, 250);

    ctx.fillStyle = '#fff';
    ctx.font = '14px "Courier New", monospace';
    ctx.fillText('Press R to restart', canvas.width / 2, 280);
    ctx.textAlign = 'left';
}

// ==============================================
// GAME LOOP
// ==============================================

/**
 * Main game loop - updates and renders the game
 */
function update(ctx, canvas, time = 0) {
    if (gameOver || paused) {
        if (gameOver) {
            drawBoard(ctx, canvas);
            drawPiece(ctx);
            drawUI(ctx, canvas);
            drawGameOver(ctx, canvas);
        }
        requestAnimationFrame((t) => update(ctx, canvas, t));
        return;
    }

    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;

    // Auto-drop piece based on current level
    if (dropCounter > dropInterval) {
        drop();
        dropCounter = 0;
    }

    // Render everything
    drawBoard(ctx, canvas);
    drawPiece(ctx);
    drawUI(ctx, canvas);

    requestAnimationFrame((t) => update(ctx, canvas, t));
}

// ==============================================
// INPUT HANDLING
// ==============================================

/**
 * Handles keyboard input
 */
function setupControls() {
    const keyHandler = (e) => {
        if (e.type !== 'keydown') return;

        // Restart game
        if (gameOver && e.code === 'KeyR') {
            e.preventDefault();
            restartGame();
            return;
        }

        // Pause toggle
        if (e.code === 'KeyP') {
            e.preventDefault();
            paused = !paused;
            return;
        }

        if (gameOver || paused) return;

        // Game controls
        switch (e.code) {
            case 'ArrowLeft':
                e.preventDefault();
                moveLeft();
                break;
            case 'ArrowRight':
                e.preventDefault();
                moveRight();
                break;
            case 'ArrowDown':
                e.preventDefault();
                drop();
                dropCounter = 0; // Reset drop counter
                break;
            case 'ArrowUp':
                e.preventDefault();
                rotate();
                break;
            case 'Space':
                e.preventDefault();
                hardDrop();
                break;
        }
    };

    document.addEventListener('keydown', keyHandler);
    return keyHandler;
}

// ==============================================
// GAME INITIALIZATION
// ==============================================

/**
 * Restarts the game
 */
function restartGame() {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    score = 0;
    lines = 0;
    level = 1;
    gameOver = false;
    paused = false;
    dropInterval = 1000;
    dropCounter = 0;
    currentPiece = null;
    nextPiece = null;
    newPiece();
}

/**
 * Initializes the game
 */
function initGame(canvas) {
    const ctx = canvas.getContext('2d');
    setupControls();
    newPiece();
    update(ctx, canvas);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initGame, restartGame };
}
