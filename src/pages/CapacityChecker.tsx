import Seo from "@/components/Seo";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import QuizSectionCard from "@/components/QuizSectionCard";
import CapacityResultCard from "@/components/CapacityResultCard";
import ProgressDots from "@/components/ProgressDots";
import { quizSections, calculateCapacityResult, CapacityResult } from "@/data/quizData";

const CapacityChecker = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<CapacityResult | null>(null);

  const currentSection = quizSections[currentSectionIndex];
  const totalQuestions = quizSections.reduce((sum, s) => sum + s.questions.length, 0);
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentSectionIndex < quizSections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      setResult(calculateCapacityResult(answers));
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1);
      setCurrentQuestionIndex(quizSections[currentSectionIndex - 1].questions.length - 1);
    }
  };

  const handleRetake = () => {
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
  };

  const isLastQuestion = currentSectionIndex === quizSections.length - 1 && currentQuestionIndex === currentSection.questions.length - 1;

  const quizJsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "Emotional Capacity Quiz",
    description:
      "A short self-assessment that measures your current emotional capacity across stress load, boundaries, rest, and support so you know what you can realistically carry right now.",
    url: "https://cantworryaboutit.com/capacity-checker",
    educationalLevel: "Beginner",
    about: { "@type": "Thing", name: "Emotional capacity" },
    provider: {
      "@type": "Organization",
      name: "CWAI \u2014 Can't Worry About It",
      url: "https://cantworryaboutit.com",
    },
    numberOfQuestions: totalQuestions,
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <Seo
        title="Emotional Capacity Quiz — Free Capacity Checker | CWAI"
        description="Take the free emotional capacity quiz: a short self-assessment of your stress load, boundaries, rest, and support, with gentle next steps for leaders."
        path="/capacity-checker"
        jsonLd={quizJsonLd}
      />
      <Navigation />
      <main className="pt-24 pb-16 px-4">
        <div className="container max-w-2xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl text-primary text-center mb-8">
            Emotional Capacity Checker
          </h1>
          {!result && (
            <p className="text-center text-muted-foreground max-w-xl mx-auto mb-8">
              A free emotional capacity quiz in {totalQuestions} short questions. It looks at your
              current stress load, boundaries, rest, and support, then gives you a capacity level
              with gentle next steps you can actually act on today.
            </p>
          )}
          {!result ? (
            <>
              <ProgressDots total={totalQuestions} current={answeredCount} className="justify-center mb-8" />
              <QuizSectionCard
                section={currentSection}
                currentQuestionIndex={currentQuestionIndex}
                answers={answers}
                onAnswer={handleAnswer}
                onNext={handleNext}
                onPrev={handlePrev}
                isLastQuestion={isLastQuestion}
                isFirstSection={currentSectionIndex === 0}
              />
            </>
          ) : (
            <CapacityResultCard result={result} onRetake={handleRetake} />
          )}
        </div>
      </main>
    </div>
  );
};

export default CapacityChecker;
