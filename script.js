// ========================================================
// Birthday Webapp Core Logic & Interactive Animations
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  initPersonalization();
  initBalloons();
  initConfettiCanvas();
  initCandles();
  initBirthdayCard();
  initGiftBox();
  initCelebrationMeter();
  initAudioSynthesizer();
  
  // Set current year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Initial welcome confetti burst
  setTimeout(() => {
    fireConfettiBurst(window.innerWidth / 2, window.innerHeight / 3, 70);
  }, 600);
});

// ========================================================
// 1. Personalization (URL Params, LocalStorage & Modal)
// ========================================================
const defaultData = {
  name: 'Bestie',
  message: 'On this joyful day, may your heart be as light as a balloon and your smiles as sweet as cake. Thank you for bringing so much light and positive energy into our lives!'
};

function initPersonalization() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramName = urlParams.get('name');
  const paramMsg = urlParams.get('msg');

  const storedName = localStorage.getItem('birthday_name');
  const storedMsg = localStorage.getItem('birthday_msg');

  const name = paramName || storedName || defaultData.name;
  const message = paramMsg || storedMsg || defaultData.message;

  updateDOMTexts(name, message);

  // Modal interactions
  const modal = document.getElementById('settings-modal');
  const openBtn = document.getElementById('open-settings-btn');
  const closeBtn = document.getElementById('close-settings-btn');
  const saveBtn = document.getElementById('save-settings-btn');
  const resetBtn = document.getElementById('reset-defaults-btn');
  const nameInput = document.getElementById('input-name');
  const msgInput = document.getElementById('input-message');

  openBtn.addEventListener('click', () => {
    nameInput.value = localStorage.getItem('birthday_name') || name;
    msgInput.value = localStorage.getItem('birthday_msg') || message;
    modal.classList.add('active');
  });

  closeBtn.addEventListener('click', () => modal.classList.remove('active'));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  saveBtn.addEventListener('click', () => {
    const newName = nameInput.value.trim() || defaultData.name;
    const newMsg = msgInput.value.trim() || defaultData.message;

    localStorage.setItem('birthday_name', newName);
    localStorage.setItem('birthday_msg', newMsg);

    updateDOMTexts(newName, newMsg);
    modal.classList.remove('active');
    fireConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 80);
  });

  resetBtn.addEventListener('click', () => {
    localStorage.removeItem('birthday_name');
    localStorage.removeItem('birthday_msg');
    nameInput.value = defaultData.name;
    msgInput.value = defaultData.message;
    updateDOMTexts(defaultData.name, defaultData.message);
  });
}

function updateDOMTexts(name, message) {
  document.getElementById('display-name').textContent = name;
  document.querySelectorAll('.card-inside-name').forEach(el => el.textContent = name);
  document.getElementById('card-message').textContent = message;
  document.title = `Happy Birthday, ${name}! 🎉🎂`;
}

// ========================================================
// 2. Ambient Floating Balloons
// ========================================================
function initBalloons() {
  const container = document.getElementById('balloon-container');
  const colors = ['#ff3366', '#ffb800', '#7928ca', '#00dfd8', '#ff6b6b', '#48dbfb', '#1dd1a1'];
  const balloonCount = 14;

  for (let i = 0; i < balloonCount; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'floating-balloon';
    balloon.style.left = `${Math.random() * 95}%`;
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.animationDuration = `${10 + Math.random() * 8}s`;
    balloon.style.animationDelay = `${Math.random() * 8}s`;
    container.appendChild(balloon);
  }
}

// ========================================================
// 3. Canvas Confetti & Fireworks Particle Engine
// ========================================================
let confettiParticles = [];
let canvas, ctx;

function initConfettiCanvas() {
  canvas = document.getElementById('confetti-canvas');
  ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotationSpeed;
      p.opacity -= p.fade;

      if (p.opacity <= 0 || p.y > canvas.height + 20) {
        confettiParticles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 'heart') {
        ctx.font = `${p.size * 1.5}px sans-serif`;
        ctx.fillText('❤️', 0, 0);
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      }

      ctx.restore();
    }

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  // Confetti Blast Button
  document.getElementById('blast-confetti-btn').addEventListener('click', (e) => {
    const rect = e.target.getBoundingClientRect();
    fireConfettiBurst(rect.left + rect.width / 2, rect.top, 100);
    boostCelebrationMeter(15);
  });

  // Fireworks Button
  document.getElementById('fireworks-btn').addEventListener('click', () => {
    launchFireworksShow();
    boostCelebrationMeter(20);
  });
}

function fireConfettiBurst(x, y, count = 50) {
  const colors = ['#ff3366', '#ffb800', '#7928ca', '#00dfd8', '#ff7675', '#74b9ff', '#55efc4', '#ffffff'];
  const shapes = ['rect', 'rect', 'circle', 'heart'];

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 9;
    confettiParticles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      gravity: 0.18,
      size: 7 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1,
      fade: 0.006 + Math.random() * 0.008
    });
  }
}

function launchFireworksShow() {
  const bursts = 5;
  for (let i = 0; i < bursts; i++) {
    setTimeout(() => {
      const rx = 100 + Math.random() * (window.innerWidth - 200);
      const ry = 80 + Math.random() * (window.innerHeight * 0.45);
      fireConfettiBurst(rx, ry, 60);
      playCheerSound();
    }, i * 350);
  }
}

// ========================================================
// 4. Cake & Candles
// ========================================================
function initCandles() {
  const candles = document.querySelectorAll('.candle');
  const blowBtn = document.getElementById('blow-candles-btn');

  function extinguishCandle(candle) {
    if (!candle.classList.contains('extinguished')) {
      candle.classList.add('extinguished');
      candle.dataset.lit = 'false';

      const rect = candle.getBoundingClientRect();
      fireConfettiBurst(rect.left + rect.width / 2, rect.top, 25);
      playCheerSound();

      // Check if all candles are extinguished
      const allExtinguished = [...candles].every(c => c.classList.contains('extinguished'));
      if (allExtinguished) {
        setTimeout(() => {
          fireConfettiBurst(window.innerWidth / 2, window.innerHeight / 3, 120);
          boostCelebrationMeter(30);
          alertWishMade();
        }, 400);
      }
    }
  }

  candles.forEach(candle => {
    candle.addEventListener('click', () => extinguishCandle(candle));
  });

  blowBtn.addEventListener('click', () => {
    const unlit = [...candles].filter(c => !c.classList.contains('extinguished'));
    if (unlit.length > 0) {
      unlit.forEach((candle, idx) => {
        setTimeout(() => extinguishCandle(candle), idx * 180);
      });
    } else {
      // Re-light the candles!
      candles.forEach(c => c.classList.remove('extinguished'));
      blowBtn.innerHTML = '<i class="fa-solid fa-wind"></i> Blow Out Candles';
    }
  });
}

function alertWishMade() {
  const blowBtn = document.getElementById('blow-candles-btn');
  blowBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i> Relight Candles';
}

// ========================================================
// 5. 3D Greeting Card
// ========================================================
function initBirthdayCard() {
  const card = document.getElementById('birthday-card');
  const toggleBtn = document.getElementById('toggle-card-btn');

  function toggleCard() {
    card.classList.toggle('opened');
    if (card.classList.contains('opened')) {
      const rect = card.getBoundingClientRect();
      fireConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);
      boostCelebrationMeter(15);
      toggleBtn.innerHTML = '<i class="fa-solid fa-envelope"></i> Close Card';
    } else {
      toggleBtn.innerHTML = '<i class="fa-solid fa-envelope-open"></i> Open Card';
    }
  }

  card.addEventListener('click', toggleCard);
  toggleBtn.addEventListener('click', toggleCard);
}

// ========================================================
// 6. Mystery Gift Box
// ========================================================
function initGiftBox() {
  const giftBox = document.getElementById('gift-box');
  const openBtn = document.getElementById('open-gift-btn');

  function toggleGift() {
    giftBox.classList.toggle('opened');
    if (giftBox.classList.contains('opened')) {
      const rect = giftBox.getBoundingClientRect();
      fireConfettiBurst(rect.left + rect.width / 2, rect.top + 40, 70);
      playCheerSound();
      boostCelebrationMeter(20);
      openBtn.innerHTML = '<i class="fa-solid fa-box"></i> Wrap It Back';
    } else {
      openBtn.innerHTML = '<i class="fa-solid fa-gift"></i> Unwrap Gift';
    }
  }

  giftBox.addEventListener('click', toggleGift);
  openBtn.addEventListener('click', toggleGift);
}

// ========================================================
// 7. Celebration Meter
// ========================================================
let currentScore = 100;
function initCelebrationMeter() {
  updateMeterDisplay();
}

function boostCelebrationMeter(amount) {
  currentScore = Math.min(200, currentScore + amount);
  updateMeterDisplay();
}

function updateMeterDisplay() {
  const fill = document.getElementById('meter-fill');
  const score = document.getElementById('meter-score');
  const percent = Math.min(100, Math.floor((currentScore / 200) * 100));
  fill.style.width = `${percent}%`;

  if (currentScore >= 180) {
    score.textContent = `${currentScore}% OVERFLOWING JOY! 🚀🔥`;
  } else if (currentScore >= 130) {
    score.textContent = `${currentScore}% ULTRA PARTY MODE 🥳🎉`;
  } else {
    score.textContent = `${currentScore}% MAXIMUM FUN 🎉`;
  }
}

// ========================================================
// 8. Web Audio API Chime & Birthday Synthesizer
// ========================================================
let audioCtx = null;
let isMusicPlaying = false;
let musicInterval = null;

// Happy Birthday Melody notes & frequencies
const birthdayNotes = [
  { note: 261.63, dur: 0.35 }, // C4
  { note: 261.63, dur: 0.25 }, // C4
  { note: 293.66, dur: 0.60 }, // D4
  { note: 261.63, dur: 0.60 }, // C4
  { note: 349.23, dur: 0.60 }, // F4
  { note: 329.63, dur: 1.10 }, // E4

  { note: 261.63, dur: 0.35 }, // C4
  { note: 261.63, dur: 0.25 }, // C4
  { note: 293.66, dur: 0.60 }, // D4
  { note: 261.63, dur: 0.60 }, // C4
  { note: 392.00, dur: 0.60 }, // G4
  { note: 349.23, dur: 1.10 }, // F4

  { note: 261.63, dur: 0.35 }, // C4
  { note: 261.63, dur: 0.25 }, // C4
  { note: 523.25, dur: 0.60 }, // C5
  { note: 440.00, dur: 0.60 }, // A4
  { note: 349.23, dur: 0.60 }, // F4
  { note: 329.63, dur: 0.60 }, // E4
  { note: 293.66, dur: 0.90 }, // D4

  { note: 466.16, dur: 0.35 }, // Bb4
  { note: 466.16, dur: 0.25 }, // Bb4
  { note: 440.00, dur: 0.60 }, // A4
  { note: 349.23, dur: 0.60 }, // F4
  { note: 392.00, dur: 0.60 }, // G4
  { note: 349.23, dur: 1.30 }  // F4
];

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq, duration, type = 'sine') {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm envelope
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    console.warn('Audio tone error:', err);
  }
}

function playCheerSound() {
  try {
    const ctx = getAudioContext();
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.25, 'triangle'), i * 60);
    });
  } catch (err) {
    console.warn('Cheer sound error:', err);
  }
}

function playBirthdayMelody() {
  let currentTime = 0;
  birthdayNotes.forEach(item => {
    setTimeout(() => {
      if (isMusicPlaying) {
        playTone(item.note, item.dur * 0.9, 'triangle');
      }
    }, currentTime * 1000);
    currentTime += item.dur;
  });

  return currentTime;
}

function initAudioSynthesizer() {
  const toggleBtn = document.getElementById('music-toggle');
  const icon = document.getElementById('music-icon');

  toggleBtn.addEventListener('click', () => {
    isMusicPlaying = !isMusicPlaying;

    if (isMusicPlaying) {
      toggleBtn.classList.add('playing');
      icon.className = 'fa-solid fa-volume-high';
      const loopDuration = playBirthdayMelody();
      musicInterval = setInterval(() => {
        if (isMusicPlaying) playBirthdayMelody();
      }, (loopDuration + 1) * 1000);
    } else {
      toggleBtn.classList.remove('playing');
      icon.className = 'fa-solid fa-volume-xmark';
      if (musicInterval) clearInterval(musicInterval);
    }
  });
}
