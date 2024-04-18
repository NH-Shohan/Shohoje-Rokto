import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import faq from "../../../public/assets/FAQ.svg";

const questionAnswer = [
  {
    question: "How to get the certificate?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam ducimus earum maiores libero nostrum dolor! Magni minima dolore est porro.",
  },
  {
    question: "How to find a donor?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam ducimus earum maiores libero nostrum dolor! Magni minima dolore est porro.",
  },
  {
    question: "How to post a request for blood?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam ducimus earum maiores libero nostrum dolor! Magni minima dolore est porro.",
  },
  {
    question: "How to use this website?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam ducimus earum maiores libero nostrum dolor! Magni minima dolore est porro.",
  },
];

const FAQ = () => {
  return (
    <div className="container my-20">
      <h2 className="text-center mb-10 text-primary capitalize">
        Frequently Asked Questions
      </h2>
      <div className="grid grid-cols-2 gap-5">
        <div className="grid items-center">
          <Accordion type="single" collapsible>
            {questionAnswer.map((qa, index) => (
              <AccordionItem value={`item-${index + 1}`} key={index}>
                <AccordionTrigger className="border text-foreground">
                  {qa.question}
                </AccordionTrigger>
                <AccordionContent>{qa.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <Image src={faq} alt="FAQ Image" className="w-full" />
      </div>
    </div>
  );
};

export default FAQ;
