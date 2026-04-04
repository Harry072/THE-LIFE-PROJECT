import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { onboardingService, AnalysisResponse } from "../services/api";
import { useUserStore, UserAnalysis } from "../store/useUserStore";
import { Button } from "../components/ui/Button";

const questions = [
  {
    key: "focus",
    text: "How often do you find yourself losing focus during deep work?",
    options: ["Rarely", "Sometimes", "Often", "Always"]
  },
  {
    key: "discipline",
    text: "How consistent are you with your daily habits?",
    options: ["Very consistent", "Somewhat consistent", "Inconsistent", "No routine at all"]
  },
  {
    key: "sleep",
    text: "How would you rate your sleep quality lately?",
    options: ["Excellent", "Good", "Fair", "Poor"]
  },
  {
    key: "purpose",
    text: "Do you feel like your daily actions align with your long-term goals?",
    options: ["Completely", "Mostly", "Somewhat", "Not at all"]
  }
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { user, setOnboardingCompleted, setAnalysis } = useUserStore();

  const mutation = useMutation({
    mutationFn: (data: { userId: string; answers: { question_key: string; answer: string }[] }) => 
      onboardingService.submit(data.userId, data.answers),
    onSuccess: (data: AnalysisResponse) => {
      setAnalysis(data as unknown as UserAnalysis);
      setOnboardingCompleted(true);
      navigate("/dashboard");
    }
  });

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [questions[currentStep].key]: answer };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit
      const formattedAnswers = Object.entries(newAnswers).map(([key, value]) => ({
        question_key: key,
        answer: value
      }));
      mutation.mutate({ userId: user?.id || "guest_user", answers: formattedAnswers });
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <span className="text-xs font-medium uppercase tracking-widest opacity-40 mb-4 block">
              Step {currentStep + 1} of {questions.length}
            </span>
            <h2 className="text-3xl font-serif italic text-[#2D2D2D] mb-12">
              {questions[currentStep].text}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {questions[currentStep].options.map((option) => (
                <Button
                  key={option}
                  variant="outline"
                  className="py-6 text-lg hover:bg-[#2D2D2D] hover:text-white transition-all"
                  onClick={() => handleAnswer(option)}
                  disabled={mutation.isPending}
                >
                  {option}
                </Button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        
        {mutation.isPending && (
          <p className="text-center mt-8 text-sm opacity-40 animate-pulse">
            Analyzing your path...
          </p>
        )}
      </div>
    </main>
  );
}
