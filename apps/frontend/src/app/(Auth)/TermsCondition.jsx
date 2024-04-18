import {
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import conditions from "@/data/conditions.json";
import Link from "next/link";

const TermsCondition = () => {
  return (
    <DrawerContent className="sm:w-full md:w-1/3 mx-auto p-6">
      <DrawerTitle className="text-primary mt-0 pb-3">
        Terms and Conditions for Shohoje Rokto
      </DrawerTitle>

      <ScrollArea className="h-full">
        <DrawerDescription>
          Welcome to Shohoje Rokto, a platform dedicated to facilitating blood
          donation and connecting donors with recipients in Bangladesh. Before
          you proceed to sign up and use our services, please carefully read and
          understand the following terms and conditions:
          {conditions.map((condition, index) => (
            <div key={index}>
              <p className="font-semibold text-foreground mt-3">
                {condition.title}
              </p>
              <p>{condition.description}</p>
            </div>
          ))}
          <p className="font-semibold text-foreground mt-3">Privacy Policy</p>
          <p>
            Your privacy is important to us. Please review our{" "}
            <Link
              href="privacy-policy"
              className="text-primary underline hover:font-medium transition-all"
            >
              Privacy Policy
            </Link>{" "}
            to understand how we collect, use, and protect your personal
            information.
          </p>
          <div className="mt-5">
            By using Shohoje Rokto, you acknowledge that you have read,
            understood, and agreed to these terms and conditions. Thank you for
            being a part of our community and contributing to the noble cause of
            blood donation.
          </div>
        </DrawerDescription>
      </ScrollArea>
    </DrawerContent>
  );
};

export default TermsCondition;
