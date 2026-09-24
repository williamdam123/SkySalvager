import { drawSky } from './renderer.js';

export class SalvageGame {
  constructor(canvas, callbacks) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.callbacks = callbacks;
    this.state = 'menu';
    this.reset();
    this.resize();
    addEventListener('resize', () => this.resize());
  }

  reset() {
    this.playerX = .5;
    this.score = 0;
    this.hull = 3;
    this.time = 45;
    this.items = [];
    this.clock = 0;
  }

  resize() {
    const ratio = window.devicePixelRatio || 1;
    this.canvas.width = innerWidth * ratio;
    this.canvas.height = innerHeight * ratio;
    this.context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  start() {
    this.reset();
    this.state = 'play';
    this.callbacks.hud(this);
    this.callbacks.toast('TAKE OFF');
  }

  togglePause() {
    if (this.state === 'play') {
      this.state = 'paused';
      this.callbacks.pause(true);
    } else if (this.state === 'paused') {
      this.state = 'play';
      this.callbacks.pause(false);
    }
  }

  move(amount) {
    if (this.state === 'play') {
      this.playerX = Math.max(.08, Math.min(.92, this.playerX + amount));
    }
  }

  moveTo(pointerX) {
    if (this.state === 'play') {
      this.playerX = Math.max(.08, Math.min(.92, pointerX / innerWidth));
    }
  }

  update(delta) {
    if (this.state !== 'play') return;
    this.time -= delta;
    this.clock += delta;
    if (Math.random() < delta * .9) {
      this.items.push({
        x: .12 + Math.random() * .76,
        y: -.08,
        type: Math.random() < .27 ? 'mine' : 'shard',
        speed: .18 + Math.random() * .1,
        size: 13,
        spin: Math.random() * 7
      });
    }
    for (let index = this.items.length - 1; index >= 0; index--) {
      const item = this.items[index];
      item.y += item.speed * delta;
      item.x += Math.sin(this.clock * 2 + item.spin) * .018 * delta;
            const horizontalDistance = (item.x - this.playerX) * innerWidth;
            const verticalDistance = (item.y - .78) * innerHeight;
            const distance = Math.hypot(horizontalDistance, verticalDistance);
            const catchRadius = item.size + 34;
            if (distance <= catchRadius) {
        this.items.splice(index, 1);
        if (item.type === 'shard') {
          this.score += 100;
          this.callbacks.toast('+100 SUN SHARD');
          this.callbacks.beep(680);
        } else {
          this.hull--;
          this.callbacks.toast('STORM HIT', true);
          this.callbacks.beep(130);
          if (this.hull <= 0) return this.finish(false);
        }
      } else if (item.y > 1.1) {
        this.items.splice(index, 1);
      }
    }
    if (this.time <= 0) this.finish(true);
    this.callbacks.hud(this);
  }

  finish(won) {
    this.state = won ? 'win' : 'lose';
    this.callbacks.result(this, won);
    this.callbacks.beep(won ? 700 : 90);
  }

  render(now) {
    drawSky(this.context, innerWidth, innerHeight, now, this.items, this.playerX);
  }
}
