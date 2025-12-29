import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface SoundOption {
  id: string;
  name: string;
  icon: string;
  frequency?: number;
}

const sounds: SoundOption[] = [
  { id: "rain", name: "Gentle Rain", icon: "🌧️" },
  { id: "ocean", name: "Ocean Waves", icon: "🌊" },
  { id: "forest", name: "Forest", icon: "🌲" },
  { id: "wind", name: "Soft Wind", icon: "🍃" },
];

const CalmSounds = () => {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);

  // Create ambient sound using Web Audio API
  const createAmbientSound = (type: string) => {
    if (audioContext) {
      audioContext.close();
    }

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Different configurations for different sounds
    switch (type) {
      case "rain":
        // Pink noise for rain
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;
        filter.type = "lowpass";
        filter.frequency.value = 400;
        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        gain.gain.value = 0.1;
        whiteNoise.start();
        setAudioContext(ctx);
        return;
      case "ocean":
        osc.type = "sine";
        osc.frequency.value = 0.1;
        break;
      case "forest":
        osc.type = "sine";
        osc.frequency.value = 200;
        break;
      case "wind":
        osc.type = "sine";
        osc.frequency.value = 50;
        break;
    }

    // Create a more natural sound with modulation
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.2;
    lfoGain.gain.value = 20;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    filter.type = "lowpass";
    filter.frequency.value = 800;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.value = 0.05;

    osc.start();
    lfo.start();

    setAudioContext(ctx);
    setOscillator(osc);
    setGainNode(gain);
  };

  const toggleSound = (soundId: string) => {
    if (activeSound === soundId) {
      // Stop sound
      if (audioContext) {
        audioContext.close();
        setAudioContext(null);
      }
      setActiveSound(null);
    } else {
      // Start new sound
      createAmbientSound(soundId);
      setActiveSound(soundId);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [audioContext]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-3">
        {sounds.map((sound) => (
          <button
            key={sound.id}
            onClick={() => toggleSound(sound.id)}
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover-lift",
              activeSound === sound.id
                ? "bg-primary text-primary-foreground shadow-soft-lg"
                : "bg-card shadow-soft hover:bg-muted"
            )}
          >
            <span className="text-2xl">{sound.icon}</span>
            <div className="flex-1 text-left">
              <p className="font-medium text-sm">{sound.name}</p>
            </div>
            {activeSound === sound.id ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4 opacity-50" />
            )}
          </button>
        ))}
      </div>

      {activeSound && (
        <p className="text-center text-sm text-muted-foreground mt-4 animate-fade-in">
          Playing: {sounds.find((s) => s.id === activeSound)?.name}
        </p>
      )}
    </div>
  );
};

export default CalmSounds;
