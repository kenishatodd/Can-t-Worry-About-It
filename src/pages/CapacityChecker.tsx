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

  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navigation />
      <main className="pt-24 pb-16 px-4">
        <div className="container max-w-2xl mx-auto">
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
