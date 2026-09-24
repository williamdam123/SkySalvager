import { SkyAudio } from './audio.js';
import { SalvageGame } from './game.js';

const $ = id => document.getElementById(id);
const audio = new SkyAudio();
const game = new SalvageGame($('gameCanvas'), {
	hud: updateHud,
	toast: showToast,
	pause: showPause,
	result: showResult,
	beep: frequency => audio.beep(frequency)
});
let last = performance.now();

function updateHud(current) {
	$('score').textContent = String(current.score).padStart(4, '0');
	$('time').textContent = Math.max(0, Math.ceil(current.time));
	$('hull').textContent = String(current.hull).padStart(2, '0');
	$('timeBar').style.width = `${Math.max(0, current.time / 45 * 100)}%`;
	$('hullBar').style.width = `${Math.max(0, current.hull / 3 * 100)}%`;
}

function showToast(text, danger = false) {
	const toast = $('toast');
	toast.textContent = text;
	toast.className = `toast on ${danger ? 'danger' : ''}`;
	clearTimeout(toast.timer);
	toast.timer = setTimeout(() => { toast.className = 'toast'; }, 700);
}

function showPause(isPaused) {
	$('pausePanel').hidden = !isPaused;
	document.body.classList.toggle('panel-open', isPaused);
}

function showResult(current, won) {
	document.body.classList.add('panel-open');
	$('resultPanel').hidden = false;
	$('resultEyebrow').textContent = won ? 'FLIGHT COMPLETE' : 'HULL BREACHED';
	$('resultTitle').textContent = won ? 'Touchdown' : 'Storm lost you';
	$('resultText').textContent = won
		? `You brought ${current.score} sun shards back to the landing beacon.`
		: 'The storm took your last hull point before you could land.';
	$('againButton').textContent = won ? 'FLY AGAIN' : 'RETRY FLIGHT';
}

function begin() {
	audio.start();
	game.start();
	document.body.classList.remove('panel-open');
	$('menuPanel').hidden = true;
	$('resultPanel').hidden = true;
	$('pausePanel').hidden = true;
}

function toggleSound() {
	const muted = audio.toggle();
	document.querySelectorAll('.sound-control').forEach(button => {
		button.textContent = muted ? 'SOUND OFF' : 'SOUND ON';
	});
}

function setVolume(value) {
	audio.setVolume(value);
	document.querySelectorAll('.volume-slider').forEach(slider => {
		slider.value = value;
	});
	document.querySelectorAll('.volume-control output').forEach(output => {
		output.textContent = value;
	});
}

$('startButton').onclick = begin;
$('againButton').onclick = begin;
$('resumeButton').onclick = () => game.togglePause();
$('pauseButton').onclick = () => game.togglePause();
$('soundButton').onclick = toggleSound;
$('menuButton').onclick = () => {
	game.state = 'menu';
	document.body.classList.add('panel-open');
	$('resultPanel').hidden = true;
	$('menuPanel').hidden = false;
};
document.querySelectorAll('.volume-slider').forEach(slider => {
	slider.oninput = event => setVolume(event.target.value);
});

onkeydown = event => {
	const key = event.key.toLowerCase();
	if (key === 'p') return game.togglePause();
	if (key === 'q' && game.state === 'paused') {
		game.state = 'menu';
		$('pausePanel').hidden = true;
		$('menuPanel').hidden = false;
		return;
	}
	if (key === 'a' || event.key === 'ArrowLeft') game.move(-.06);
	if (key === 'd' || event.key === 'ArrowRight') game.move(.06);
};

$('gameCanvas').onpointermove = event => game.moveTo(event.clientX);

document.addEventListener('pointerdown', () => audio.start());
document.addEventListener('keydown', () => audio.start());

function loop(now) {
	const delta = Math.min(.05, (now - last) / 1000);
	last = now;
	game.update(delta);
	game.render(now);
	requestAnimationFrame(loop);
}

audio.start();
updateHud(game);
setVolume(50);
requestAnimationFrame(loop);
