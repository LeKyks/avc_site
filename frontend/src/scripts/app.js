const PHOTOS = [
  './image Lorette/Capture d\'écran 2024-01-29 203438.png',
  './image Lorette/Capture d\'écran 2024-02-03 144413.png',
  './image Lorette/Capture d\'écran 2024-02-18 212856.png',
  './image Lorette/Capture d\'écran 2024-06-11 202425.png',
  './image Lorette/Capture d\'écran 2024-08-20 221330.png',
  './image Lorette/Capture d\'écran 2024-08-20 221423.png',
];

const CONFETTI_COLORS = ['#FF6B9D', '#FFD93D', '#C77DFF', '#FF8E53', '#FFD700', '#FF69B4', '#FFA726'];
const EMOJIS = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '�', '', '', ''];

const THEME_EMOJIS = {
  default: ['', '', '', '', '', '', '', '', '', '', '', ''],
  explosion: ['', '', '', '', '', '', '', '', '', '', '', ''],
  space: ['', '', '', '', '', '', '', '', '', '', '', ''],
  flowers: ['', '', '', '', '', '', '', '', '', '', '', ''],
  water: ['', '', '', '', '', '', '', '', '', '', '', ''],
  disco: ['', '', '', '', '', '', '', '', '', '', '', ''],
  fire: ['', '', '', '', '', '', '', '', '', '', '', ''],
  candy: ['', '', '', '', '', '', '', '', '', '', '', ''],
  flip: ['', '', '', '', '', '', '', '', '', '', '', '']
};

const THEME_COLORS = {
  default: ['#FF6B9D', '#FFD93D', '#C77DFF', '#FF8E53', '#FFD700', '#FF69B4'],
  explosion: ['#FF4500', '#FF6347', '#FFD700', '#FFA500', '#FF0000', '#FFFF00'],
  space: ['#4B0082', '#9400D3', '#00BFFF', '#1E90FF', '#87CEEB', '#E6E6FA'],
  flowers: ['#FFB7C5', '#FF69B4', '#FF1493', '#DB7093', '#FFC0CB', '#98FB98'],
  water: ['#00CED1', '#20B2AA', '#48D1CC', '#40E0D0', '#00FFFF', '#7FFFD4'],
  disco: ['#FF00FF', '#00FFFF', '#FFFF00', '#FF1493', '#00FF00', '#FF4500'],
  fire: ['#FF4500', '#FF6347', '#FFA500', '#FFD700', '#FF0000', '#DC143C'],
  candy: ['#FF69B4', '#FFB6C1', '#DDA0DD', '#EE82EE', '#FF1493', '#FF00FF'],
  flip: ['#FF6B9D', '#FFD93D', '#C77DFF', '#FF8E53', '#FFD700', '#FF69B4']
};

const confettiContainer = document.getElementById('confetti-container');
const floatingHearts = document.getElementById('floating-hearts');
const sparkleContainer = document.getElementById('sparkle-container');
const floatingEmojis = document.getElementById('floating-emojis');
const clickableEmojis = document.getElementById('clickable-emojis');
const floatingPhotos = document.getElementById('floating-photos');
const particlesContainer = document.getElementById('particles-container');
const clickCounter = document.getElementById('click-counter');
const photoModal = document.getElementById('photo-modal');
const modalPhoto = document.getElementById('modal-photo');
const mainContainer = document.getElementById('main-container');
const loretteTitle = document.getElementById('lorette-title');

let totalClicks = parseInt(localStorage.getItem('birthday-clicks') || '0');
let crazyEffectActive = false;
let currentTheme = 'default';
let autoThemeInterval = null;

const random = (min, max) => Math.random() * (max - min) + min;
const randomInt = (min, max) => Math.floor(random(min, max));
const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Sons cartoon avec Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playCartoonSound(type) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  switch(type) {
    case 'pop':
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
      break;
      
    case 'boing':
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.05);
      oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.15);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
      break;
      
    case 'whoosh':
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      oscillator.type = 'sawtooth';
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
      break;
      
    case 'ding':
      oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.type = 'sine';
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
      break;
      
    case 'explosion':
      oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.type = 'sawtooth';
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
      break;
      
    case 'spring':
      for (let i = 0; i < 5; i++) {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.setValueAtTime(300 + i * 100, audioContext.currentTime + i * 0.03);
        gain.gain.setValueAtTime(0.1, audioContext.currentTime + i * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.03 + 0.1);
        osc.start(audioContext.currentTime + i * 0.03);
        osc.stop(audioContext.currentTime + i * 0.03 + 0.1);
      }
      return;
      
    case 'sparkle':
      oscillator.frequency.setValueAtTime(2000, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(3000, audioContext.currentTime + 0.05);
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      oscillator.type = 'sine';
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
      break;
  }
}

function getCurrentEmojis() {
  return THEME_EMOJIS[currentTheme] || THEME_EMOJIS.default;
}

function getCurrentColors() {
  return THEME_COLORS[currentTheme] || THEME_COLORS.default;
}

function createConfetti() {
  const confetti = document.createElement('div');
  const shapes = ['circle', 'square', 'star'];
  confetti.className = `confetti ${randomChoice(shapes)}`;
  confetti.style.left = `${random(0, 100)}vw`;
  confetti.style.backgroundColor = randomChoice(getCurrentColors());
  confetti.style.animationDuration = `${random(1.5, 3)}s`;
  confettiContainer.appendChild(confetti);
  setTimeout(() => confetti.remove(), 3000);
}

function launchConfetti(count = 50) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => createConfetti(), i * 10);
  }
  if (count > 100) playCartoonSound('explosion');
  else playCartoonSound('pop');
}

function createFloatingHeart() {
  const heart = document.createElement('div');
  const hearts = ['❤️', '💕', '💖', '💗', '💝', '💓', '💞', '🩷', '🤍', '💜', '🧡', '💛', '💚', '💙'];
  heart.className = 'floating-heart';
  heart.textContent = randomChoice(hearts);
  heart.style.left = `${random(0, 100)}vw`;
  heart.style.fontSize = `${random(15, 55)}px`;
  heart.style.animationDuration = `${random(3, 7)}s`;
  floatingHearts.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}

function createFloatingEmoji() {
  const emoji = document.createElement('div');
  emoji.className = 'floating-emoji';
  emoji.textContent = randomChoice(getCurrentEmojis());
  emoji.style.left = `${random(0, 100)}vw`;
  emoji.style.fontSize = `${random(20, 65)}px`;
  emoji.style.animationDuration = `${random(2.5, 6)}s`;
  floatingEmojis.appendChild(emoji);
  setTimeout(() => emoji.remove(), 6000);
}

function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = `${random(0, 100)}vw`;
  particle.style.top = `${random(0, 100)}vh`;
  particle.style.width = `${random(4, 15)}px`;
  particle.style.height = particle.style.width;
  particle.style.backgroundColor = randomChoice(getCurrentColors());
  particle.style.animationDuration = `${random(2, 6)}s`;
  particlesContainer.appendChild(particle);
  setTimeout(() => particle.remove(), 6000);
}

function createClickableEmoji() {
  const emoji = document.createElement('div');
  emoji.className = 'clickable-emoji';
  emoji.textContent = randomChoice(getCurrentEmojis());
  
  emoji.style.left = `${random(3, 92)}vw`;
  emoji.style.top = `${random(3, 92)}vh`;
  emoji.style.fontSize = `${random(30, 70)}px`;
  
  const animations = ['wobble', 'pulse-grow', 'float-random', 'spin-slow', 'bounce-crazy', 'shake-rotate'];
  emoji.style.animation = `${randomChoice(animations)} ${random(1, 3)}s ease-in-out infinite`;
  emoji.style.animationDelay = `${random(0, 1.5)}s`;
  
  emoji.addEventListener('click', (e) => {
    e.stopPropagation();
    showRandomPhoto();
    playCartoonSound('boing');
    
    emoji.style.transform = 'scale(3) rotate(1080deg)';
    emoji.style.opacity = '0';
    launchConfetti(25);
    
    setTimeout(() => {
      emoji.style.left = `${random(3, 92)}vw`;
      emoji.style.top = `${random(3, 92)}vh`;
      emoji.textContent = randomChoice(getCurrentEmojis());
      emoji.style.transform = 'scale(1) rotate(0deg)';
      emoji.style.opacity = '1';
    }, 350);
  });
  
  clickableEmojis.appendChild(emoji);
}

function spawnClickableEmojis(count = 50) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => createClickableEmoji(), i * 60);
  }
}

function refreshClickableEmojis() {
  const emojis = clickableEmojis.querySelectorAll('.clickable-emoji');
  emojis.forEach(emoji => {
    emoji.textContent = randomChoice(getCurrentEmojis());
  });
}

function createFloatingPhoto() {
  const photo = document.createElement('img');
  photo.src = randomChoice(PHOTOS);
  photo.className = 'floating-photo';
  photo.style.left = `${random(5, 85)}vw`;
  photo.style.top = `${random(5, 85)}vh`;
  photo.style.width = `${random(60, 140)}px`;
  photo.style.height = `${random(60, 140)}px`;
  photo.style.transform = `rotate(${random(-30, 30)}deg)`;
  floatingPhotos.appendChild(photo);
  setTimeout(() => photo.remove(), 6000);
}

function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.textContent = randomChoice(['✨', '⭐', '🌟', '💫', '✴️', '❇️', '⚡']);
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  sparkleContainer.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 500);
  
  if (Math.random() > 0.95) playCartoonSound('sparkle');
}

function setTheme(themeName) {
  currentTheme = themeName;
  document.body.className = `theme-${themeName} font-body text-warm min-h-screen overflow-hidden`;
  
  playCartoonSound('whoosh');
  refreshClickableEmojis();
  launchConfetti(150);
  
  for (let i = 0; i < 50; i++) {
    setTimeout(() => createFloatingEmoji(), i * 30);
  }
  
  switch(themeName) {
    case 'explosion':
      mainContainer.classList.add('shake-screen');
      for (let i = 0; i < 80; i++) setTimeout(() => createParticle(), i * 20);
      setTimeout(() => mainContainer.classList.remove('shake-screen'), 3000);
      break;
    case 'space':
      for (let i = 0; i < 120; i++) setTimeout(() => createParticle(), i * 15);
      break;
    case 'flowers':
      for (let i = 0; i < 60; i++) setTimeout(() => createFloatingHeart(), i * 40);
      break;
    case 'water':
      document.body.classList.add('wave-animation');
      for (let i = 0; i < 70; i++) setTimeout(() => createParticle(), i * 25);
      break;
    case 'disco':
      document.body.classList.add('disco-mode');
      break;
    case 'fire':
      for (let i = 0; i < 90; i++) setTimeout(() => createParticle(), i * 18);
      mainContainer.classList.add('shake-screen');
      setTimeout(() => mainContainer.classList.remove('shake-screen'), 2000);
      break;
    case 'candy':
      for (let i = 0; i < 50; i++) setTimeout(() => createFloatingHeart(), i * 35);
      break;
    case 'flip':
      mainContainer.classList.add('upside-down');
      break;
  }
  
  incrementClicks();
}

function resetTheme() {
  currentTheme = 'default';
  document.body.className = 'bg-background font-body text-warm min-h-screen overflow-hidden';
  mainContainer.classList.remove('upside-down', 'shake-screen');
  document.body.classList.remove('disco-mode', 'wave-animation');
}

function startAutoThemeChange() {
  if (autoThemeInterval) clearInterval(autoThemeInterval);
  
  autoThemeInterval = setInterval(() => {
    const themes = ['default', 'explosion', 'space', 'flowers', 'water', 'disco', 'fire', 'candy', 'flip'];
    const newTheme = randomChoice(themes);
    resetTheme();
    if (newTheme !== 'default') {
      setTheme(newTheme);
    }
  }, 15000);
}

const CRAZY_EFFECTS = [
  () => {
    mainContainer.classList.add('upside-down');
    setTimeout(() => mainContainer.classList.remove('upside-down'), 2500);
  },
  () => {
    document.body.classList.add('disco-mode');
    setTimeout(() => document.body.classList.remove('disco-mode'), 2500);
  },
  () => {
    mainContainer.classList.add('shake-screen');
    setTimeout(() => mainContainer.classList.remove('shake-screen'), 1500);
  },
  () => {
    document.body.classList.add('invert-mode');
    setTimeout(() => document.body.classList.remove('invert-mode'), 1500);
  },
  () => {
    document.body.classList.add('glitch-mode');
    setTimeout(() => document.body.classList.remove('glitch-mode'), 1200);
  },
  () => {
    for (let i = 0; i < 40; i++) setTimeout(() => createFloatingPhoto(), i * 40);
  },
  () => {
    mainContainer.classList.add('spin-mode');
    setTimeout(() => mainContainer.classList.remove('spin-mode'), 1800);
  },
  () => {
    launchConfetti(400);
    for (let i = 0; i < 80; i++) setTimeout(() => createFloatingHeart(), i * 20);
    for (let i = 0; i < 70; i++) setTimeout(() => createFloatingEmoji(), i * 25);
  },
  () => {
    loretteTitle.style.transition = 'transform 0.4s';
    loretteTitle.style.transform = 'scale(2.5) rotate(20deg)';
    setTimeout(() => loretteTitle.style.transform = '', 1800);
  },
  () => {
    document.body.classList.add('rainbow-mode');
    setTimeout(() => document.body.classList.remove('rainbow-mode'), 2500);
  },
  () => {
    for (let i = 0; i < 100; i++) setTimeout(() => createParticle(), i * 15);
  },
  () => {
    mainContainer.classList.add('tiny-mode');
    setTimeout(() => mainContainer.classList.remove('tiny-mode'), 1500);
  },
  () => {
    mainContainer.classList.add('giant-mode');
    setTimeout(() => mainContainer.classList.remove('giant-mode'), 1500);
  },
  () => {
    const themes = ['explosion', 'space', 'flowers', 'water', 'disco', 'fire', 'candy'];
    resetTheme();
    setTheme(randomChoice(themes));
  }
];

function triggerCrazyEffect() {
  if (crazyEffectActive) return;
  crazyEffectActive = true;
  
  const sounds = ['boing', 'spring', 'whoosh', 'explosion'];
  playCartoonSound(randomChoice(sounds));
  
  randomChoice(CRAZY_EFFECTS)();
  setTimeout(() => crazyEffectActive = false, 2500);
}

function incrementClicks() {
  totalClicks++;
  localStorage.setItem('birthday-clicks', totalClicks.toString());
  if (clickCounter) clickCounter.textContent = totalClicks;
  
  if (totalClicks % 2 === 0) {
    triggerCrazyEffect();
  }
}

function showPhoto(index) {
  const photoSrc = PHOTOS[index % PHOTOS.length];
  if (photoSrc && modalPhoto && photoModal) {
    modalPhoto.src = photoSrc;
    photoModal.classList.add('show');
    playCartoonSound('ding');
    launchConfetti(50);
    incrementClicks();
  }
}

function showRandomPhoto() {
  showPhoto(randomInt(0, PHOTOS.length));
}

function closePhotoModal() {
  if (photoModal) photoModal.classList.remove('show');
}

function initEventListeners() {
  document.getElementById('theme-explosion')?.addEventListener('click', () => { playCartoonSound('explosion'); resetTheme(); setTheme('explosion'); });
  document.getElementById('theme-space')?.addEventListener('click', () => { playCartoonSound('whoosh'); resetTheme(); setTheme('space'); });
  document.getElementById('theme-flowers')?.addEventListener('click', () => { playCartoonSound('ding'); resetTheme(); setTheme('flowers'); });
  document.getElementById('theme-water')?.addEventListener('click', () => { playCartoonSound('boing'); resetTheme(); setTheme('water'); });
  document.getElementById('theme-flip')?.addEventListener('click', () => { playCartoonSound('spring'); resetTheme(); setTheme('flip'); });
  document.getElementById('theme-disco')?.addEventListener('click', () => { playCartoonSound('pop'); resetTheme(); setTheme('disco'); });
  document.getElementById('theme-fire')?.addEventListener('click', () => { playCartoonSound('explosion'); resetTheme(); setTheme('fire'); });
  document.getElementById('theme-candy')?.addEventListener('click', () => { playCartoonSound('ding'); resetTheme(); setTheme('candy'); });
  
  if (loretteTitle) {
    loretteTitle.addEventListener('click', () => {
      playCartoonSound('explosion');
      launchConfetti(300);
      for (let i = 0; i < 70; i++) setTimeout(() => createFloatingHeart(), i * 30);
      for (let i = 0; i < 60; i++) setTimeout(() => createFloatingEmoji(), i * 35);
      for (let i = 0; i < 50; i++) setTimeout(() => createParticle(), i * 20);
      triggerCrazyEffect();
      incrementClicks();
    });
  }
  
  const birthdayText = document.getElementById('birthday-text');
  if (birthdayText) {
    birthdayText.addEventListener('click', () => {
      playCartoonSound('spring');
      for (let i = 0; i < 40; i++) setTimeout(() => createFloatingHeart(), i * 40);
      launchConfetti(80);
      incrementClicks();
    });
  }
  
  const counterBox = document.getElementById('counter-box');
  if (counterBox) {
    counterBox.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerCrazyEffect();
      incrementClicks();
    });
  }
  
  let lastSparkle = 0;
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkle > 40) {
      createSparkle(e.clientX, e.clientY);
      lastSparkle = now;
    }
  });
  
  document.addEventListener('click', (e) => {
    // Son basé sur la zone de l'écran
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const x = e.clientX;
    const y = e.clientY;
    
    // Diviser l'écran en 9 zones (3x3)
    const zone = {
      col: Math.floor((x / screenWidth) * 3), // 0, 1, 2 (gauche, centre, droite)
      row: Math.floor((y / screenHeight) * 3) // 0, 1, 2 (haut, milieu, bas)
    };
    
    // Jouer un son différent selon la zone
    if (zone.col === 0 && zone.row === 0) playCartoonSound('ding'); // Haut-gauche
    else if (zone.col === 1 && zone.row === 0) playCartoonSound('sparkle'); // Haut-centre
    else if (zone.col === 2 && zone.row === 0) playCartoonSound('pop'); // Haut-droite
    else if (zone.col === 0 && zone.row === 1) playCartoonSound('boing'); // Milieu-gauche
    else if (zone.col === 1 && zone.row === 1) playCartoonSound('explosion'); // Centre
    else if (zone.col === 2 && zone.row === 1) playCartoonSound('spring'); // Milieu-droite
    else if (zone.col === 0 && zone.row === 2) playCartoonSound('whoosh'); // Bas-gauche
    else if (zone.col === 1 && zone.row === 2) playCartoonSound('pop'); // Bas-centre
    else if (zone.col === 2 && zone.row === 2) playCartoonSound('ding'); // Bas-droite
    
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        createSparkle(e.clientX + random(-60, 60), e.clientY + random(-60, 60));
      }, i * 20);
    }
  });
  
  if (photoModal) {
    photoModal.addEventListener('click', (e) => {
      if (e.target === photoModal) closePhotoModal();
    });
  }
  const closeBtn = document.getElementById('close-photo-modal');
  if (closeBtn) closeBtn.addEventListener('click', closePhotoModal);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'c') launchConfetti(150);
    if (e.key === 'h') for (let i = 0; i < 50; i++) setTimeout(() => createFloatingHeart(), i * 30);
    if (e.key === ' ') showRandomPhoto();
    if (e.key === 'Escape') { closePhotoModal(); resetTheme(); }
    if (e.key === 'l') triggerCrazyEffect();
    if (e.key === 't') {
      const themes = ['explosion', 'space', 'flowers', 'water', 'disco', 'fire', 'candy', 'flip'];
      resetTheme();
      setTheme(randomChoice(themes));
    }
  });
}

function startBackgroundAnimations() {
  setInterval(() => {
    if (Math.random() > 0.2) createFloatingHeart();
  }, 400);
  
  setInterval(() => {
    if (Math.random() > 0.25) createFloatingEmoji();
  }, 450);
  
  setInterval(() => {
    if (Math.random() > 0.3) createParticle();
  }, 250);
  
  setInterval(() => {
    if (Math.random() > 0.75) createFloatingPhoto();
  }, 2000);
  
  setInterval(() => {
    if (Math.random() > 0.5) createConfetti();
  }, 200);
  
  setInterval(() => {
    const emojis = clickableEmojis.querySelectorAll('.clickable-emoji');
    emojis.forEach(emoji => {
      if (Math.random() > 0.4) {
        emoji.style.transition = 'left 0.8s ease, top 0.8s ease';
        emoji.style.left = `${random(3, 92)}vw`;
        emoji.style.top = `${random(3, 92)}vh`;
      }
    });
  }, 1000);
  
  setInterval(() => {
    const buttons = document.querySelectorAll('.theme-btn');
    buttons.forEach(btn => {
      const currentStyle = window.getComputedStyle(btn);
      
      if (currentStyle.top !== 'auto') {
        const currentTop = parseFloat(currentStyle.top) / window.innerHeight * 100;
        btn.style.top = `${Math.max(3, Math.min(92, currentTop + random(-10, 10)))}%`;
      }
      if (currentStyle.left !== 'auto') {
        const currentLeft = parseFloat(currentStyle.left) / window.innerWidth * 100;
        btn.style.left = `${Math.max(2, Math.min(92, currentLeft + random(-10, 10)))}%`;
      }
      if (currentStyle.right !== 'auto') {
        const currentRight = parseFloat(currentStyle.right) / window.innerWidth * 100;
        btn.style.right = `${Math.max(2, Math.min(92, currentRight + random(-10, 10)))}%`;
      }
      if (currentStyle.bottom !== 'auto') {
        const currentBottom = parseFloat(currentStyle.bottom) / window.innerHeight * 100;
        btn.style.bottom = `${Math.max(3, Math.min(92, currentBottom + random(-10, 10)))}%`;
      }
    });
  }, 1800);
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('🎂💖✨ Joyeux Anniversaire Lorette ! ✨💖🎂');
  
  initEventListeners();
  if (clickCounter) clickCounter.textContent = totalClicks;
  
  spawnClickableEmojis(50);
  
  setTimeout(() => launchConfetti(200), 100);
  for (let i = 0; i < 50; i++) setTimeout(() => createFloatingHeart(), 150 + i * 60);
  for (let i = 0; i < 45; i++) setTimeout(() => createFloatingEmoji(), 200 + i * 70);
  for (let i = 0; i < 70; i++) setTimeout(() => createParticle(), 250 + i * 40);
  
  startBackgroundAnimations();
  startAutoThemeChange();
});
