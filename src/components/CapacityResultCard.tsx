import { CapacityResult } from "@/data/quizData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Sparkles, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface CapacityResultCardProps {
  result: CapacityResult;
  onRetake: () => void;
}

const CapacityResultCard = ({ result, onRetake }: CapacityResultCardProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      {/* Result Header */}
      <div className={cn("rounded-2xl p-8 mb-6 text-center", result.bgColor)}>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background/50 mb-4">
          <Heart className={cn("w-8 h-8", result.color)} />
        </div>
        <h2 className={cn("font-serif text-3xl md:text-4xl mb-2", result.color)}>
          {result.title}
        </h2>
      </div>

      {/* Affirmation */}
      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft mb-6">
        <p className="font-serif text-lg md:text-xl text-foreground leading-relaxed italic">
          "{result.affirmation}"
        </p>
      </div>

      {/* Gentle Next Step */}
      <div className="bg-secondary/30 rounded-2xl p-6 mb-6">
        <h3 className="font-serif text-xl text-primary mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Your Gentle Next Step
        </h3>
        <p className="text-foreground">{result.gentleNextStep}</p>
      </div>

      {/* Guidance Cards */}
      <div className="space-y-4 mb-6">
        {/* Grounding Exercise */}
        <div className="bg-card rounded-xl p-5 shadow-soft">
          <h4 className="font-medium text-primary mb-2">🌱 Grounding Exercise</h4>
          <p className="text-muted-foreground text-sm">{result.groundingExercise}</p>
        </div>

        {/* Mindset Reframe */}
        <div className="bg-card rounded-xl p-5 shadow-soft">
          <h4 className="font-medium text-primary mb-2">💭 Mindset Reframe</h4>
          <p className="text-muted-foreground text-sm">{result.mindsetReframe}</p>
        </div>

        {/* Optional Action */}
        <div className="bg-card rounded-xl p-5 shadow-soft">
          <h4 className="font-medium text-primary mb-2">✨ Optional Action</h4>
          <p className="text-muted-foreground text-sm">{result.optionalAction}</p>
        </div>
      </div>

      {/* Micro Actions */}
      <div className="bg-muted/50 rounded-2xl p-6 mb-8">
        <h3 className="font-serif text-xl text-primary mb-4">
          Three Micro-Actions for Today
        </h3>
        <ul className="space-y-3">
          {result.microActions.map((action, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/50 flex items-center justify-center text-xs font-medium">
                {index + 1}
              </span>
              <span className="text-foreground">{action}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          asChild
          className="flex-1 rounded-xl bg-primary hover:bg-primary/90 h-12"
        >
          <Link to="/guide" className="flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4" />
            Open the CWAI Guide
          </Link>
        </Button>
        <Button
          variant="outline"
          onClick={onRetake}
          className="flex-1 rounded-xl h-12"
        >
          Retake Check-In
        </Button>
      </div>
    </div>
  );
};

export default CapacityResultCard;
