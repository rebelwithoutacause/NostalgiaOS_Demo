# NostalgiaOS Demo

A retro Windows 98-inspired operating system interface running entirely in your browser. This is a **demo project** inspired by [windows93.net](https://windows93.net), bringing back the nostalgic aesthetic and feel of late 90s computing with a modern twist.

![NostalgiaOS Demo](https://img.shields.io/badge/status-demo-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## 🎮 Features

### Desktop Environment
- **Classic Windows 98 Interface** - Authentic teal desktop background with taskbar and Start menu
- **Window Manager** - Draggable, resizable, and closeable windows with minimize/maximize functionality
- **Desktop Icons** - My Computer, Documents, and Internet Explorer shortcuts
- **Working Clock** - Live time display in the taskbar tray

### Games
- **Tetris** - Classic falling blocks game with pause (P) and restart (R) functionality
- **Solitaire** - Traditional card game (Klondike variant)
- **Minesweeper** - Three difficulty levels:
  - Beginner (9×9 grid, 10 mines)
  - Intermediate (16×16 grid, 40 mines)
  - Expert (20×20 grid, 70 mines)

### Applications
- **Retro VHS Calculator** - Functional calculator with a unique green CRT/VHS aesthetic
  - Green phosphor glow effects
  - Scanline animations
  - VHS tracking distortion
  - Full keyboard support

### Easter Eggs
- **VHS Horror Popup** - A creepy system error popup that appears after 6-13 minutes of idle time
  - Glitch effects and vintage VHS aesthetics
  - Eerie messages and silhouette animations
  - Can also be triggered from Control Panel

## 🚀 Getting Started

### Online Demo
**GitHub Pages setup required**: To enable the live demo, go to your repository Settings → Pages → Source and select "main" branch. The demo will then be available at: `https://rebelwithoutacause.github.io/NostalgiaOS_Demo/`

### Local Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/rebelwithoutacause/NostalgiaOS_Demo.git
   ```

2. Navigate to the project directory:
   ```bash
   cd NostalgiaOS_Demo
   ```

3. Open `index.html` in your web browser:
   ```bash
   # On Windows
   start index.html

   # On macOS
   open index.html

   # On Linux
   xdg-open index.html
   ```

No build process or dependencies required!

## 🎯 How to Use

1. **Opening Applications** - Click the Start button or double-click desktop icons
2. **Window Management** - Drag title bars to move windows, click X to close
3. **Games Menu** - Hover over "Games" in the Start menu to see available games
4. **Calculator** - Use mouse clicks or keyboard for input
5. **Minesweeper** - Left-click to reveal, right-click to flag

## 🛠️ Technical Details

### Technologies Used
- **HTML5** - Structure and layout
- **CSS3** - Styling with retro Windows 98 aesthetic
- **Vanilla JavaScript** - No frameworks, pure JS for all functionality

### File Structure
```
NostalgiaOS_Demo/
├── index.html          # Main desktop environment
├── style.css           # Windows 98 styling
├── horror.css          # VHS horror popup styles
├── wm.js              # Window manager logic
├── apps.js            # All application implementations
├── calculator.html    # Standalone calculator (alternative version)
├── tetris.png         # Tetris icon
├── solitaire.png      # Solitaire icon
└── README.md          # This file
```

## 🎨 Inspiration

This project was inspired by [windows93.net](https://windows93.net), an amazing web-based recreation of a fictional Windows 93 operating system. NostalgiaOS Demo aims to capture that same nostalgic feeling while adding unique features like the VHS horror aesthetic and retro CRT calculator.

## ⚠️ Demo Notice

**This is a demo project** created for educational and entertainment purposes. It is not a fully-functional operating system and runs entirely in the browser. Some features are simulated or incomplete.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Add new retro applications

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by [windows93.net](https://windows93.net)
- Windows 98 UI design by Microsoft
- VHS horror aesthetic inspired by analog horror genre

## 🔮 Future Ideas

- More classic Windows games (Paint, Notepad, etc.)
- Network simulation with fake internet browser
- File system explorer
- More easter eggs and hidden features
- Sound effects and background music
- Screensavers

---

**Note:** Best experienced on desktop browsers. Mobile support may be limited.

🤖 *Generated with [Claude Code](https://claude.com/claude-code)*