
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import ecoAIService from '@/services/ecoAIService';
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

type Question = {
  id: number;
  text: string;
  options: {
    value: number;
    label: string;
  }[];
};

const questions: Question[] = [
  {
    id: 1,
    text: "How do you typically commute to work or school?",
    options: [
      { value: 10, label: "Car (alone)" },
      { value: 5, label: "Carpool" },
      { value: 3, label: "Public transportation" },
      { value: 1, label: "Bike or walk" },
      { value: 7, label: "Motorcycle" }
    ]
  },
  {
    id: 2,
    text: "How many hours per day do you use electricity at home?",
    options: [
      { value: 10, label: "More than 12 hours" },
      { value: 7, label: "8-12 hours" },
      { value: 5, label: "4-8 hours" },
      { value: 2, label: "Less than 4 hours" }
    ]
  },
  {
    id: 3,
    text: "How often do you eat animal-based products?",
    options: [
      { value: 10, label: "Daily, multiple meals" },
      { value: 7, label: "Daily, one meal" },
      { value: 5, label: "A few times per week" },
      { value: 2, label: "Rarely" },
      { value: 1, label: "Never (vegan)" }
    ]
  },
  {
    id: 4,
    text: "How much waste do you typically generate per week?",
    options: [
      { value: 10, label: "More than 3 full trash bags" },
      { value: 7, label: "2-3 trash bags" },
      { value: 4, label: "1 trash bag" },
      { value: 1, label: "Less than half a trash bag" }
    ]
  },
  {
    id: 5,
    text: "How often do you purchase new clothes or electronics?",
    options: [
      { value: 10, label: "Weekly" },
      { value: 7, label: "Monthly" },
      { value: 4, label: "Every few months" },
      { value: 1, label: "Rarely (1-2 times per year)" }
    ]
  },
  {
    id: 6,
    text: "What is your home's primary heating/cooling source?",
    options: [
      { value: 10, label: "Coal or oil" },
      { value: 7, label: "Natural gas" },
      { value: 4, label: "Electricity" },
      { value: 1, label: "Renewable energy (solar, wind)" }
    ]
  },
  {
    id: 7,
    text: "How many flights do you take per year?",
    options: [
      { value: 10, label: "More than 6" },
      { value: 7, label: "3-6" },
      { value: 4, label: "1-2" },
      { value: 1, label: "None" }
    ]
  },
  {
    id: 8,
    text: "How much water do you use daily?",
    options: [
      { value: 10, label: "Long showers, frequent laundry/dishwasher use" },
      { value: 7, label: "Average usage" },
      { value: 4, label: "Conscious water conservation" },
      { value: 1, label: "Minimal usage with active conservation" }
    ]
  },
  {
    id: 9,
    text: "How often do you recycle?",
    options: [
      { value: 10, label: "Never" },
      { value: 7, label: "Occasionally" },
      { value: 3, label: "Most of the time" },
      { value: 1, label: "Always, with proper sorting" }
    ]
  },
  {
    id: 10,
    text: "What percentage of your food is locally sourced?",
    options: [
      { value: 10, label: "0-10%" },
      { value: 7, label: "10-30%" },
      { value: 4, label: "30-60%" },
      { value: 1, label: "More than 60%" }
    ]
  }
];

const FootprintCalculator: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [footprintResult, setFootprintResult] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (answers[currentQuestion] === 0) {
      toast.error("Please select an answer before continuing");
      return;
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateFootprint();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateFootprint = () => {
    setIsCalculating(true);
    setTimeout(() => {
      // Use a random user ID for demo purposes
      const userId = `user_${Math.floor(Math.random() * 1000)}`;
      
      // Calculate total score from answers
      const totalScore = answers.reduce((sum, value) => sum + value, 0);
      const normalizedScore = (totalScore / (questions.length * 10)) * 100;
      
      const result = `Your footprint: ${normalizedScore.toFixed(1)} points`;
      setFootprintResult(result);
      
      // Store the result
      ecoAIService.calculateFootprint(userId, normalizedScore, normalizedScore, normalizedScore, normalizedScore);
      
      // Get AI suggestions
      const improvements = ecoAIService.suggestImprovements(userId);
      setSuggestions(improvements);
      
      ecoAIService.storeFootprintSecurely(userId, ecoAIService.getUserFootprint(userId) || 0);
      
      setShowResults(true);
      setIsCalculating(false);
      
      toast.success("Footprint calculated successfully!");
    }, 2000); // Simulating calculation time
  };

  const resetCalculator = () => {
    setShowResults(false);
    setFootprintResult(null);
    setSuggestions([]);
    setAnswers(Array(questions.length).fill(0));
    setCurrentQuestion(0);
  };

  return (
    <motion.div 
      className="eco-card glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-semibold mb-6">Ecological Footprint Calculator</h2>
      
      {!showResults ? (
        <div className="space-y-6">
          <div className="mb-2">
            <Progress value={progress} className="h-2" />
            <p className="text-right text-sm text-muted-foreground mt-1">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="min-h-[250px]"
            >
              <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].text}</h3>
              
              <RadioGroup 
                value={answers[currentQuestion].toString()} 
                onValueChange={(value) => handleAnswer(parseInt(value))}
                className="space-y-3"
              >
                {questions[currentQuestion].options.map((option) => (
                  <div key={option.value} className="flex items-start space-x-2 p-3 rounded-lg hover:bg-accent/20 transition-colors">
                    <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                    <Label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between pt-4">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                onClick={goToPreviousQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                className="bg-gradient-to-r from-eco-leaf to-eco-moss text-white relative overflow-hidden group flex items-center gap-1"
                onClick={goToNextQuestion}
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <span className="flex items-center justify-center">
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></span>
                    Calculating...
                  </span>
                ) : currentQuestion < questions.length - 1 ? (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                ) : (
                  <>
                    Calculate Result
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
                <motion.span 
                  className="absolute inset-0 w-full h-full bg-white/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 0.15 }}
                  transition={{ duration: 0.5 }}
                  style={{ borderRadius: "inherit", originX: 0.5, originY: 0.5 }}
                />
              </Button>
            </motion.div>
          </div>
        </div>
      ) : (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="py-6 px-4 bg-gradient-to-br from-eco-leaf/10 to-eco-sky/10 rounded-xl text-center">
            <h3 className="text-xl font-bold text-primary mb-2">{footprintResult}</h3>
            <p className="text-sm text-muted-foreground">Your ecological impact on the planet</p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">AI Suggestions:</h3>
            {suggestions.map((suggestion, index) => (
              <motion.div 
                key={index}
                className="flex gap-3 items-start p-3 rounded-lg bg-accent/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <div className="mt-0.5 bg-primary/20 p-1 rounded-full">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm">{suggestion}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="pt-2"
          >
            <Button 
              variant="outline" 
              className="w-full"
              onClick={resetCalculator}
            >
              Calculate Again
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FootprintCalculator;
