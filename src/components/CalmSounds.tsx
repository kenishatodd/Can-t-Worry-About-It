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

  // Create noise buffer for ambient sounds
  const createNoiseBuffer = (ctx: AudioContext) => {
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return noiseBuffer;
  };

  // Create ambient sound using Web Audio API
  const createAmbientSound = (type: string) => {
    if (audioContext) {
      audioContext.close();
    }

    const ctx = new AudioContext();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const noiseBuffer = createNoiseBuffer(ctx);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Different configurations for different sounds
    switch (type) {
      case "rain":
        filter.type = "lowpass";
        filter.frequency.value = 400;
        gain.gain.value = 0.1;
        break;
      case "ocean":
        // Ocean waves - lower frequency rumble with modulation
        filter.type = "lowpass";
        filter.frequency.value = 200;
        gain.gain.value = 0.15;
        // Add slow modulation for wave effect
        const lfoOcean = ctx.createOscillator();
        const lfoGainOcean = ctx.createGain();
        lfoOcean.frequency.value = 0.1; // Slow wave rhythm
        lfoGainOcean.gain.value = 0.08;
        lfoOcean.connect(lfoGainOcean);
        lfoGainOcean.connect(gain.gain);
        lfoOcean.start();
        break;
      case "forest":
        // Forest - higher frequencies for birds/rustling
        filter.type = "bandpass";
        filter.frequency.value = 2000;
        filter.Q.value = 0.5;
        gain.gain.value = 0.06;
        // Add some variation
        const lfoForest = ctx.createOscillator();
        const lfoGainForest = ctx.createGain();
        lfoForest.frequency.value = 0.3;
        lfoGainForest.gain.value = 0.03;
        lfoForest.connect(lfoGainForest);
        lfoGainForest.connect(gain.gain);
        lfoForest.start();
        break;
      case "wind":
        // Wind - mid-range whooshing
        filter.type = "bandpass";
        filter.frequency.value = 600;
        filter.Q.value = 0.3;
        gain.gain.value = 0.12;
        // Add wind gusts modulation
        const lfoWind = ctx.createOscillator();
        const lfoGainWind = ctx.createGain();
        lfoWind.frequency.value = 0.15;
        lfoGainWind.gain.value = 0.06;
        lfoWind.connect(lfoGainWind);
        lfoGainWind.connect(gain.gain);
        lfoWind.start();
        break;
    }

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noiseSource.start();

    setAudioContext(ctx);
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
