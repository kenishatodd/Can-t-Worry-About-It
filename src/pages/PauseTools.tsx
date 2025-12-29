import { useState } from "react";
import Navigation from "@/components/Navigation";
import BreathingCircle from "@/components/BreathingCircle";
import GentleReminder from "@/components/GentleReminder";
import CalmSounds from "@/components/CalmSounds";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

const PauseTools = () => {
  const [isBreathing, setIsBreathing] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navigation />
      <main className="pt-24 pb-16 px-4">
        <div className="container max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-primary mb-4">Pause Tools</h1>
            <p className="text-muted-foreground">Take a moment. You deserve this breath.</p>
          </div>

          {/* Breathing Exercise */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl text-primary mb-6 text-center">60-Second Breathing</h2>
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <BreathingCircle isActive={isBreathing} duration={60} onComplete={() => setIsBreathing(false)} />
              <div className="flex justify-center mt-8">
                <Button onClick={() => setIsBreathing(!isBreathing)} className="rounded-xl gap-2 bg-primary hover:bg-primary/90 h-12 px-8">
                  {isBreathing ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Start Breathing</>}
                </Button>
              </div>
            </div>
          </section>

          {/* Gentle Reminder */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl text-primary mb-6 text-center">Gentle Reminders</h2>
            <GentleReminder />
          </section>

          {/* Calm Sounds */}
          <section>
            <h2 className="font-serif text-2xl text-primary mb-6 text-center">Calm Sounds</h2>
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <CalmSounds />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PauseTools;
