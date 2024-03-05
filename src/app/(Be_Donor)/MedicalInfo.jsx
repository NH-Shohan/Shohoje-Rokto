import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

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

const MedicalInfo = () => {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  console.log(answers);

  return (
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
            value={answers[id]}
            className="flex gap-6 ml-4"
            name={`question-${id}`}
          >
            <div className="flex items-center space-x-1">
              <RadioGroupItem
                value="yes"
                id={`yes-${id}`}
                onClick={() => handleAnswerChange(id, "yes")}
              />
              <Label htmlFor={`yes-${id}`}>Yes</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem
                value="no"
                id={`no-${id}`}
                onClick={() => handleAnswerChange(id, "no")}
              />
              <Label htmlFor={`no-${id}`}>No</Label>
            </div>
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default MedicalInfo;
