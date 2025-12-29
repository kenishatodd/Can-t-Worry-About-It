import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BreathingCircleProps {
  isActive: boolean;
  duration?: number; // in seconds
  onComplete?: () => void;
}

const BreathingCircle = ({
  isActive,
  duration = 60,
  onComplete,
}: BreathingCircleProps) => {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [timeLeft, setTimeLeft] = useState(duration);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setTimeLeft(duration);
      setPhase("inhale");
      setCycleCount(0);
      return;
    }

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Breathing cycle: 4s inhale, 4s hold, 4s exhale
    const breathCycle = setInterval(() => {
      setPhase((current) => {
        if (current === "inhale") return "hold";
        if (current === "hold") return "exhale";
        setCycleCount((c) => c + 1);
        return "inhale";
      });
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(breathCycle);
    };
  }, [isActive, duration, onComplete]);

  const phaseText = {
    inhale: "Breathe in...",
    hold: "Hold gently...",
    exhale: "Let it go...",
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Breathing Circle */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        {/* Outer glow */}
        <div
          className={cn(
            "absolute inset-0 rounded-full transition-all duration-[4000ms] ease-in-out",
            phase === "inhale" && "scale-110 opacity-100",
            phase === "hold" && "scale-110 opacity-80",
            phase === "exhale" && "scale-100 opacity-60"
          )}
          style={{
            background: `radial-gradient(circle, hsl(var(--sage) / 0.3) 0%, transparent 70%)`,
          }}
        />

        {/* Main circle */}
        <div
          className={cn(
            "w-48 h-48 md:w-60 md:h-60 rounded-full bg-gradient-to-br from-sage/40 to-sage/20 border-2 border-sage/30 flex items-center justify-center transition-all duration-[4000ms] ease-in-out shadow-soft-lg",
            phase === "inhale" && "scale-110",
            phase === "hold" && "scale-110",
            phase === "exhale" && "scale-100"
          )}
        >
          <div className="text-center">
            <p className="font-serif text-2xl md:text-3xl text-sage-dark mb-2">
              {isActive ? phaseText[phase] : "Ready"}
            </p>
            {isActive && (
              <p className="text-lg text-muted-foreground">
                {formatTime(timeLeft)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Cycle counter */}
      {isActive && cycleCount > 0 && (
        <p className="mt-6 text-muted-foreground text-sm animate-fade-in">
          {cycleCount} breath{cycleCount !== 1 ? "s" : ""} completed
        </p>
      )}
    </div>
  );
};

export default BreathingCircle;
