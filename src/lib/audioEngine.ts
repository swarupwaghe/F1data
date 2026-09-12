/**
 * Programmatic Web Audio API F1 Engine Sound Synthesizer
 * Generates authentic high-RPM V6/V10 F1 engine roar and rev-up audio without external mp3 dependencies.
 */

let audioCtx: AudioContext | null = null;

export function playEngineRevSound(onComplete?: () => void) {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) {
      if (onComplete) onComplete();
      return;
    }

    audioCtx = new AudioContextClass();

    const now = audioCtx.currentTime;

    // Master Gain Node
    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.01, now);
    masterGain.gain.exponentialRampToValueAtTime(0.35, now + 0.1);
    masterGain.gain.exponentialRampToValueAtTime(0.5, now + 0.8);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);
    masterGain.connect(audioCtx.destination);

    // Oscillator 1: Low rumble base tone (Cylinder ignition frequency)
    const osc1 = audioCtx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(110, now); // Idle RPM ~ 2000 RPM equivalent
    osc1.frequency.exponentialRampToValueAtTime(550, now + 1.2); // Rev up to ~ 14,000 RPM!
    osc1.frequency.exponentialRampToValueAtTime(800, now + 1.8);

    // Oscillator 2: High harmonic exhaust scream
    const osc2 = audioCtx.createOscillator();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(220, now);
    osc2.frequency.exponentialRampToValueAtTime(1100, now + 1.2);
    osc2.frequency.exponentialRampToValueAtTime(1600, now + 1.8);

    // Distortion / Overdrive for raw F1 race engine crunch
    const waveShaper = audioCtx.createWaveShaper();
    const curve = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
        const x = (i * 2) / 256 - 1;
        curve[i] = (3 + 10) * x * 20 * (Math.PI / 180) / (Math.PI + 10 * Math.abs(x));
    }
    waveShaper.curve = curve;

    // Lowpass filter (simulates exhaust acoustic chamber & turbo whistle)
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(6500, now + 1.2);

    // Connect nodes
    osc1.connect(waveShaper);
    osc2.connect(waveShaper);
    waveShaper.connect(filter);
    filter.connect(masterGain);

    // Start oscillators
    osc1.start(now);
    osc2.start(now);

    osc1.stop(now + 2.3);
    osc2.stop(now + 2.3);

    // Trigger callback when rev sequence completes
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 1800);

  } catch (err) {
    console.warn('Web Audio API initialized with fallback', err);
    if (onComplete) onComplete();
  }
}
