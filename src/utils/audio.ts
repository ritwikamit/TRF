// Tactile camera shutter sound synthesis using Web Audio API
let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export const toggleShutterSound = (): boolean => {
  soundEnabled = !soundEnabled;
  return soundEnabled;
};

export const isShutterSoundEnabled = (): boolean => {
  return soundEnabled;
};

export const playShutterClick = () => {
  if (!soundEnabled) return;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Dual-curtain mechanical shutter click
    // 1st curtain opening click
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(320, now);
    osc1.frequency.exponentialRampToValueAtTime(80, now + 0.015);
    gain1.gain.setValueAtTime(0.06, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.015);

    // 2nd curtain closing click (after 40ms)
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(450, now + 0.04);
    osc2.frequency.exponentialRampToValueAtTime(110, now + 0.06);
    gain2.gain.setValueAtTime(0.05, now + 0.04);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(now + 0.04);
    osc2.stop(now + 0.06);
  } catch (err) {
    // Graceful fallback if browser policies block audio
  }
};
