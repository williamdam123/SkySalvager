export class SkyAudio {
  constructor() {
    this.context = null;
    this.master = null;
    this.music = null;
    this.timer = null;
    this.muted = false;
    this.outputLevel = 3.2;
  }

  start() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!this.context) {
      this.context = new AudioContext();
      this.master = this.context.createGain();
      this.music = this.context.createGain();
      this.music.gain.value = 1.15;
      this.music.connect(this.master);
      this.master.connect(this.context.destination);
      this.master.gain.value = this.outputLevel;
    }
        if (this.context.state === 'suspended') this.context.resume().catch(() => {});
    if (this.timer) return;

    const notes = [220, 277, 330, 277, 247];
    let step = 0;
    this.timer = setInterval(() => {
      if (this.muted) return;
      const oscillator = this.context.createOscillator();
      const gain = this.context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = notes[step++ % notes.length];
      gain.gain.setValueAtTime(.001, this.context.currentTime);
          gain.gain.exponentialRampToValueAtTime(.12, this.context.currentTime + .04);
      gain.gain.exponentialRampToValueAtTime(.001, this.context.currentTime + .42);
      oscillator.connect(gain).connect(this.music);
      oscillator.start();
      oscillator.stop(this.context.currentTime + .45);
    }, 500);
  }

  setVolume(value) {
    if (this.music) this.music.gain.value = Number(value) / 100;
  }

  toggle() {
    this.start();
    this.muted = !this.muted;
    if (this.master) this.master.gain.value = this.muted ? 0 : this.outputLevel;
    return this.muted;
  }

  beep(frequency = 400) {
    if (!this.context || this.muted) return;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    oscillator.frequency.value = frequency;
    gain.gain.value = .22;
    oscillator.connect(gain).connect(this.master);
    oscillator.start();
    oscillator.stop(this.context.currentTime + .1);
  }
}
