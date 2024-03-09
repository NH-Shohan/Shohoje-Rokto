import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const questions = [
  {
    id: 1,
    question:
      "Do you have any pre-existing medical conditions (e.g. Diabetes, Thyroid, etc.)?",
  },
  {
    id: 2,
    question: "Are you currently taking any antibiotics?",
  },
  {
    id: 3,
    question: "Have you received any vaccinations in the past four weeks?",
  },
  {
    id: 4,
    question: "Do you have any allergies to medicine or other substances?",
  },
  {
    id: 5,
    question: "Have you received a COVID-19 vaccine?",
  },
  {
    id: 6,
    question:
      "Have you got a tattoo or permanent makeup in the past six months?",
  },
];

const MedicalInfo = ({
  isComplete,
  currentStep,
  handlePrev,
  handleNext,
  stepsConfig,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [answers, setAnswers] = useState(() => {
    const storedData = localStorage.getItem("medicalData");
    return storedData ? JSON.parse(storedData) : {};
  });

  useEffect(() => {
    setIsClient(true);
    localStorage.setItem("medicalData", JSON.stringify(answers));

    const timeoutId = setTimeout(() => {
      localStorage.removeItem("medicalData");
    }, 20 * 60 * 1000);

    return () => clearTimeout(timeoutId);
  }, [answers]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const isAllFieldsFilled = () => {
    return questions.every(({ id }) => answers[id]);
  };

  const handleClickNext = () => {
    if (isAllFieldsFilled()) {
      handleNext();
    } else {
      const unansweredQuestions = questions.filter(
        (question) => !answers[question.id]
      );
      unansweredQuestions.forEach((question) => {
        toast.warning(
          `Please answer question ${question.id}: ${question.question}`
        );
      });
    }
  };

  return (
    <>
      {isClient ? (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="text-primary">
              Please fill up the form carefully for being a donor.
            </p>
            <Link
              href="/request-blood"
              className="text-green-600 hover:text-green-700 hover:underline flex gap-1 items-center"
            >
              Request blood
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>

          {questions.map(({ id, question }) => (
            <div key={id} className="my-2">
              <p className="mb-1 dark:text-foreground">
                {id}. {question}
              </p>
              <RadioGroup
                defaultValue={answers[id]}
                className="flex gap-6 ml-4"
                name={`question-${id}`}
                onValueChange={(value) => handleAnswerChange(`${id}`, value)}
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="yes" id={`yes-${id}`} />
                  <Label htmlFor={`yes-${id}`}>Yes</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="no" id={`no-${id}`} />
                  <Label htmlFor={`no-${id}`}>No</Label>
                </div>
              </RadioGroup>
            </div>
          ))}

          <div className="flex gap-4 mt-5">
            {!isComplete && (
              <>
                {currentStep !== 1 && (
                  <Button onClick={handlePrev} className="w-1/5">
                    {stepsConfig.length === currentStep
                      ? "Previous"
                      : "Previous"}
                  </Button>
                )}

                {currentStep !== stepsConfig.length && (
                  <Button onClick={handleClickNext} className="w-1/5">
                    {stepsConfig.length === currentStep ? "Finish" : "Next"}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MedicalInfo;
