// Web Audio API Synthesizer for sweet, gentle sound effects
// Lazy initialized upon user interaction to satisfy modern browser autoplay policies.

let audioCtx: AudioContext | null = null;
let isMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    // Standard and prefixed AudioContext support
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const toggleMute = (): boolean => {
  isMuted = !isMuted;
  return isMuted;
};

export const getMuteStatus = (): boolean => {
  return isMuted;
};

/**
 * Plays a beautiful, gentle chime for a correct answer.
 * We blend a soft sine wave chord (E5, B5, E6) with smooth attack and decay
 * to create a delicate crystal-bell effect.
 */
export const playCorrectSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Create nodes
  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);
  masterGain.gain.setValueAtTime(0, now);
  masterGain.gain.linearRampToValueAtTime(0.25, now + 0.05);
  masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

  // Note 1: E5 (659.25 Hz)
  const osc1 = ctx.createOscillator();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(659.25, now);
  const gain1 = ctx.createGain();
  gain1.gain.setValueAtTime(0.12, now);
  osc1.connect(gain1);
  gain1.connect(masterGain);

  // Note 2: B5 (987.77 Hz), delayed by 60ms
  const osc2 = ctx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(987.77, now + 0.06);
  const gain2 = ctx.createGain();
  gain2.gain.setValueAtTime(0, now);
  gain2.gain.setValueAtTime(0.08, now + 0.06);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
  osc2.connect(gain2);
  gain2.connect(masterGain);

  // Note 3: E6 (1318.51 Hz) - crystal chime sparkle, delayed by 120ms
  const osc3 = ctx.createOscillator();
  osc3.type = 'sine';
  osc3.frequency.setValueAtTime(1318.51, now + 0.12);
  const gain3 = ctx.createGain();
  gain3.gain.setValueAtTime(0, now);
  gain3.gain.setValueAtTime(0.05, now + 0.12);
  gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
  osc3.connect(gain3);
  gain3.connect(masterGain);

  // Start & Stop
  osc1.start(now);
  osc1.stop(now + 1.3);
  
  osc2.start(now + 0.06);
  osc2.stop(now + 1.3);

  osc3.start(now + 0.12);
  osc3.stop(now + 1.3);
};

/**
 * Plays a soft, mellow "warm droplet" dual-tone for incorrect answers.
 * Uses low frequencies and smooth lowpass filters to remain completely non-jarring.
 */
export const playIncorrectSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Master Gain
  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);
  masterGain.gain.setValueAtTime(0, now);
  masterGain.gain.linearRampToValueAtTime(0.2, now + 0.03);
  masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

  // Lowpass filter to keep it warm and soft
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(600, now);
  filter.connect(masterGain);

  // G3 (196 Hz) dropping to E3 (164.81 Hz)
  const osc = ctx.createOscillator();
  osc.type = 'triangle'; // triangle has soft harmonics
  osc.frequency.setValueAtTime(196.00, now);
  osc.frequency.exponentialRampToValueAtTime(164.81, now + 0.3);

  osc.connect(filter);

  // Start & Stop
  osc.start(now);
  osc.stop(now + 0.7);
};
