const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const keys = document.querySelectorAll('.key');
const keyMap = new Map(Array.from(keys).map((key) => [key.dataset.key, key]));

function playTone(frequency) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.value = Number(frequency);

  gainNode.gain.setValueAtTime(0.001, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5);
}

function triggerKey(keyElement) {
  if (!keyElement) return;
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  keyElement.classList.add('active');
  playTone(keyElement.dataset.note);
  setTimeout(() => keyElement.classList.remove('active'), 120);
}

keys.forEach((key) => {
  key.addEventListener('click', () => triggerKey(key));
});

document.addEventListener('keydown', (event) => {
  const pressed = event.key.toLowerCase();
  triggerKey(keyMap.get(pressed));
});
