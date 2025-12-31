import { useState } from "react";
import { guideChapters, GuideChapter } from "@/data/guideData";
import { Button } from "@/components/ui/button";
import { Lock, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PremiumUpgrade from "@/components/PremiumUpgrade";

interface GuideReaderProps {
  isPaidUser?: boolean;
}

const ADMIN_EMAILS = ["drtodd@myyahoo.com"];

const GuideReader = ({ isPaidUser = false }: GuideReaderProps) => {
  const { user } = useAuth();
  const [selectedChapter, setSelectedChapter] = useState<GuideChapter | null>(null);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  // Unlock all content for admin emails
  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());
  const hasFullAccess = isPaidUser || isAdmin;

  const handleChapterClick = (chapter: GuideChapter) => {
    if (!chapter.isFree && !hasFullAccess) {
      setShowUpgradePrompt(true);
      return;
    }
    setSelectedChapter(chapter);
  };

  const currentIndex = selectedChapter
    ? guideChapters.findIndex((c) => c.id === selectedChapter.id)
    : -1;

  const goToNext = () => {
    if (currentIndex < guideChapters.length - 1) {
      const nextChapter = guideChapters[currentIndex + 1];
      if (!nextChapter.isFree && !hasFullAccess) {
        setShowUpgradePrompt(true);
        return;
      }
      setSelectedChapter(nextChapter);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setSelectedChapter(guideChapters[currentIndex - 1]);
    }
  };

  // Render inline formatting (bold text)
  const renderInlineFormatting = (text: string) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = text.split(boldRegex);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i}>{part}</strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  // Render chapter content with improved paragraph handling
  const renderContent = (content: string) => {
    // Split by double newlines to get paragraphs
    const blocks = content.split(/\n\n+/);
    
    return blocks.map((block, index) => {
      const trimmedBlock = block.trim();
      
      // Skip empty blocks
      if (!trimmedBlock) return null;
      
      // H1 heading
      if (trimmedBlock.startsWith("# ")) {
        return (
          <h1
            key={index}
            className="font-serif text-3xl md:text-4xl text-primary mb-6 mt-8 first:mt-0"
          >
            {trimmedBlock.slice(2)}
          </h1>
        );
      }
      
      // H2 heading
      if (trimmedBlock.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="font-serif text-2xl text-primary mb-4 mt-8"
          >
            {trimmedBlock.slice(3)}
          </h2>
        );
      }
      
      // Horizontal rule
      if (trimmedBlock === "---") {
        return <hr key={index} className="my-8 border-border/50" />;
      }
      
      // List items (handle multiple lines starting with -)
      if (trimmedBlock.startsWith("- ")) {
        const items = trimmedBlock.split("\n").filter(line => line.startsWith("- "));
        return (
          <ul key={index} className="mb-6 space-y-3">
            {items.map((item, i) => (
              <li key={i} className="text-foreground text-lg md:text-xl ml-4">
                {renderInlineFormatting(item.slice(2))}
              </li>
            ))}
          </ul>
        );
      }
      
      // Standalone bold line (entire paragraph is bold)
      if (trimmedBlock.startsWith("**") && trimmedBlock.endsWith("**") && !trimmedBlock.slice(2, -2).includes("**")) {
        return (
          <p key={index} className="font-semibold text-foreground mb-6 text-xl md:text-2xl">
            {trimmedBlock.slice(2, -2)}
          </p>
        );
      }
      
      // Regular paragraph - join multiple lines within the block
      const paragraphText = trimmedBlock.split("\n").join(" ");
      return (
        <p key={index} className="text-foreground text-lg md:text-xl mb-6 leading-relaxed">
          {renderInlineFormatting(paragraphText)}
        </p>
      );
    });
  };

  if (selectedChapter) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => setSelectedChapter(null)}
          className="mb-6 gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Contents
        </Button>

        {/* Chapter content */}
        <div className="bg-card rounded-2xl p-6 md:p-10 shadow-soft mb-6">
          <article className="prose prose-lg max-w-none">
            {renderContent(selectedChapter.content)}
          </article>
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="rounded-xl gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
            onClick={goToNext}
            disabled={currentIndex === guideChapters.length - 1}
            className="rounded-xl gap-2 bg-primary hover:bg-primary/90"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="font-serif text-3xl md:text-4xl text-primary mb-2">
          The CWAI Guide
        </h2>
        <p className="text-muted-foreground">
          by Dr. Kenisha Elaine
        </p>
      </div>

      {/* Upgrade prompt */}
      {showUpgradePrompt && (
        <div className="mb-6 animate-fade-in">
          {user ? (
            <PremiumUpgrade />
          ) : (
            <div className="bg-accent/30 rounded-2xl p-6 text-center">
              <Lock className="w-8 h-8 text-accent-foreground mx-auto mb-3" />
              <h3 className="font-serif text-xl text-primary mb-2">
                Sign In to Unlock
              </h3>
              <p className="text-muted-foreground mb-4">
                Create an account to access all chapters, personalized guidance,
                and audio meditations.
              </p>
              <Button asChild className="rounded-xl bg-primary hover:bg-primary/90">
                <Link to="/auth">Sign In to Continue</Link>
              </Button>
              <button
                onClick={() => setShowUpgradePrompt(false)}
                className="block mx-auto mt-3 text-sm text-muted-foreground hover:text-foreground"
              >
                Maybe later
              </button>
            </div>
          )}
        </div>
      )}

      {/* Chapter list */}
      <div className="space-y-3">
        {guideChapters.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => handleChapterClick(chapter)}
            className={cn(
              "w-full text-left p-5 rounded-xl transition-all duration-300 hover-lift group",
              chapter.isFree || hasFullAccess
                ? "bg-card shadow-soft hover:shadow-soft-lg"
                : "bg-muted/50"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-serif text-xl md:text-2xl text-primary mb-1 group-hover:text-primary/80 transition-colors">
                  {chapter.title}
                </h3>
                <p className="text-base md:text-lg text-muted-foreground">
                  {chapter.description}
                </p>
              </div>
              {!chapter.isFree && !hasFullAccess && (
                <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
              )}
            </div>
            {chapter.isFree && (
              <span className="inline-block mt-2 text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                Free Preview
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GuideReader;
