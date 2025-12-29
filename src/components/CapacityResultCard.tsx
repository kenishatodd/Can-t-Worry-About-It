import { CapacityResult } from "@/data/quizData";
import { getRecommendedChapters } from "@/data/guideData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Sparkles, BookOpen, Lock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import PremiumUpgrade from "@/components/PremiumUpgrade";

interface CapacityResultCardProps {
  result: CapacityResult;
  onRetake: () => void;
}

const CapacityResultCard = ({ result, onRetake }: CapacityResultCardProps) => {
  const { user, isSubscribed } = useAuth();
  const showFullResults = isSubscribed;
  const recommendedChapters = getRecommendedChapters(result.id);

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

      {/* Affirmation - Always visible */}
      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft mb-6">
        <p className="font-serif text-lg md:text-xl text-foreground leading-relaxed italic">
          "{result.affirmation}"
        </p>
      </div>

      {showFullResults ? (
        <>
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
            <div className="bg-card rounded-xl p-5 shadow-soft">
              <h4 className="font-medium text-primary mb-2">🌱 Grounding Exercise</h4>
              <p className="text-muted-foreground text-sm">{result.groundingExercise}</p>
            </div>

            <div className="bg-card rounded-xl p-5 shadow-soft">
              <h4 className="font-medium text-primary mb-2">💭 Mindset Reframe</h4>
              <p className="text-muted-foreground text-sm">{result.mindsetReframe}</p>
            </div>

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

          {/* Recommended Chapters */}
          {recommendedChapters.length > 0 && (
            <div className="bg-card rounded-2xl p-6 shadow-soft mb-8">
              <h3 className="font-serif text-xl text-primary mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Recommended Reading
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Based on your capacity level, these chapters may resonate with you:
              </p>
              <div className="space-y-2">
                {recommendedChapters.slice(0, 3).map((chapter) => (
                  <Link
                    key={chapter.id}
                    to="/guide"
                    className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors group"
                  >
                    <div>
                      <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                        {chapter.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {chapter.description}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        /* Premium Upsell */
        <div className="mb-8">
          <div className="bg-muted/30 rounded-2xl p-6 mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/80 backdrop-blur-[2px]" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Lock className="w-4 h-4" />
                <span className="text-sm font-medium">Full Results Locked</span>
              </div>
              <div className="opacity-40 blur-[2px] pointer-events-none">
                <p className="text-sm mb-2">🌱 Grounding Exercise</p>
                <p className="text-sm mb-2">💭 Mindset Reframe</p>
                <p className="text-sm mb-2">✨ Optional Action</p>
                <p className="text-sm">📋 3 Micro-Actions for Today</p>
              </div>
            </div>
          </div>

          {user ? (
            <PremiumUpgrade />
          ) : (
            <div className="bg-card rounded-2xl p-6 shadow-soft text-center">
              <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-serif text-xl text-primary mb-2">
                Unlock Your Full Results
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Sign in to get personalized guidance, exercises, and micro-actions based on your capacity level.
              </p>
              <Button asChild className="rounded-xl">
                <Link to="/auth">Sign In to Unlock</Link>
              </Button>
            </div>
          )}
        </div>
      )}

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
