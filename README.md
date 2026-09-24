# SkySalvager

Sky Salvager is a browser-based game where you play as a ship and you have 30 seconds to collect as many sun shards as you can while avoiding the storm mines. Once 30 seconds are up, the game ends with you seeing your salvage score. If you collect three storm mines before the 30 seconds, the game is over and you lost.

## Requirements
- Visual Studio Code
- Live Server extension by Ritwick Dey
- A modern browser such as Chrome, Edge, or Firefox

## Run With Go Live
1. Open Visual Studio Code.
2. Select File > Open Folder.
3. Choose the project folder:
SkySalvager
4. Confirm these files are present:
   - index.html
   - play.html
   - styles.css
   - main.js
   - game.js
   - renderer.js
   - audio.js
5. Install the Live Server extension:
   - Open the Extensions panel with Ctrl+Shift+X.
   - Search for Live Server.
   - Install Live Server by Ritwick Dey.
6. Open index.html or play.html.
7. Right-click the file and select Open with Live Server.
8. The game should open at a local address similar to:
http://127.0.0.1:5500/index.html
or:
http://127.0.0.1:5500/play.html

## Start Playing
1. Click TAKE OFF.
2. Move the ship using:
   - A
   - D
   - Left Arrow
   - Right Arrow
   - Mouse or pointer movement
3. Collect sun shards for points.
4. Avoid storm mines.
5. Press P to pause.
6. Press Q while paused to return to the menu.
7. Use the volume slider and sound button in the HUD.

## Why Use Live Server?
The game uses JavaScript modules such as:
<script type="module" src="main.js"></script>
Browsers may block these modules when opening the HTML file directly with . Live Server provides the local web server needed for modules, audio, and reliable browser behavior.

## If the Game Does Not Start
Check the following:
- Make sure you opened the entire SkySalvager folder in VS Code.
- Start the game through Open with Live Server.
- Do not open the file directly from Windows Explorer.
- Confirm that main.js, game.js, renderer.js, and audio.js are in the same folder as play.html.
- Refresh the browser with Ctrl+R.
- Open the browser developer tools with F12 and check the Console for errors.
- Click somewhere on the page if the browser has blocked audio autoplay.

## Stop Live Server
Use one of these options:
- Click Port: 5500 in the VS Code status bar.
- Open the Command Palette with Ctrl+Shift+P.
- Run Live Server: Stop Live Server.
