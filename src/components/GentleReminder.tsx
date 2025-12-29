import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const reminders = [
  {
    icon: "🫁",
    title: "Drop your shoulders",
    description: "Notice if they're creeping up toward your ears. Let them fall.",
  },
  {
    icon: "😮‍💨",
    title: "Unclench your jaw",
    description: "Let your tongue rest gently on the roof of your mouth.",
  },
  {
    icon: "👐",
    title: "Soften your hands",
    description: "Release any tension in your fingers and palms.",
  },
  {
    icon: "🌬️",
    title: "Take a deeper breath",
    description: "Let your belly expand. Exhale slowly.",
  },
  {
    icon: "💆‍♀️",
    title: "Relax your forehead",
    description: "Smooth out any furrow between your brows.",
  },
  {
    icon: "🦶",
    title: "Feel your feet",
    description: "Notice where they touch the ground. You are supported.",
  },
  {
    icon: "💗",
    title: "Place a hand on your heart",
    description: "Feel your own warmth. You are alive. You are here.",
  },
  {
    icon: "👀",
    title: "Soften your gaze",
    description: "Let your eyes relax. You don't have to focus so hard.",
  },
];

const GentleReminder = () => {
  const [currentReminder, setCurrentReminder] = useState(reminders[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const getNewReminder = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const otherReminders = reminders.filter((r) => r !== currentReminder);
      const randomIndex = Math.floor(Math.random() * otherReminders.length);
      setCurrentReminder(otherReminders[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    // Get a random reminder on mount
    const randomIndex = Math.floor(Math.random() * reminders.length);
    setCurrentReminder(reminders[randomIndex]);
  }, []);

  return (
    <div
      className={`bg-card rounded-2xl p-6 md:p-8 shadow-soft transition-opacity duration-300 ${
        isAnimating ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center mb-6">
        <span className="text-5xl mb-4 block">{currentReminder.icon}</span>
        <h3 className="font-serif text-2xl text-primary mb-2">
          {currentReminder.title}
        </h3>
        <p className="text-muted-foreground">{currentReminder.description}</p>
      </div>

      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={getNewReminder}
          className="rounded-xl gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Another Reminder
        </Button>
      </div>
    </div>
  );
};

export default GentleReminder;
