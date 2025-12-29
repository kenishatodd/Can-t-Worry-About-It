import { QuizSection, QuizQuestion } from "@/data/quizData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuizSectionCardProps {
  section: QuizSection;
  currentQuestionIndex: number;
  answers: Record<string, number>;
  onAnswer: (questionId: string, value: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isLastQuestion: boolean;
  isFirstSection: boolean;
}

const QuizSectionCard = ({
  section,
  currentQuestionIndex,
  answers,
  onAnswer,
  onNext,
  onPrev,
  isLastQuestion,
  isFirstSection,
}: QuizSectionCardProps) => {
  const question = section.questions[currentQuestionIndex];
  const selectedValue = answers[question.id];

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-4xl mb-4 block">{section.icon}</span>
        <h2 className="font-serif text-3xl md:text-4xl text-primary mb-2">
          {section.title}
        </h2>
        <p className="text-muted-foreground">{section.description}</p>
      </div>

      {/* Question */}
      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft mb-6">
        <p className="font-serif text-xl md:text-2xl text-foreground mb-6 text-center">
          {question.text}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => onAnswer(question.id, option.value)}
              className={cn(
                "w-full p-4 rounded-xl text-left transition-all duration-300 hover-lift",
                selectedValue === option.value
                  ? "bg-primary text-primary-foreground shadow-soft-lg"
                  : "bg-muted/50 hover:bg-muted text-foreground"
              )}
            >
              <span className="text-sm md:text-base">{option.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={isFirstSection && currentQuestionIndex === 0}
          className="rounded-xl"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={selectedValue === undefined}
          className="rounded-xl bg-primary hover:bg-primary/90"
        >
          {isLastQuestion ? "See My Results" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default QuizSectionCard;
