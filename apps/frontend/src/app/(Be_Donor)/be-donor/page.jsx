"use client";

import { BeDonorProvider } from "@/context/BeDonorContext";
import DonorRegistration from "../DonorRegistration";
import MedicalInfo from "../MedicalInfo";
import PersonalInfo from "../PersonalInfo";
import Stepper from "../Stepper";

const REGISTER_STEPS = [
  {
    name: "Personal Info",
    Component: PersonalInfo,
  },
  {
    name: "Medical Info",
    Component: MedicalInfo,
  },
  {
    name: "Registration",
    Component: DonorRegistration,
  },
];

const BeDonor = () => {
  return (
    <BeDonorProvider>
      <div className="container">
        <Stepper stepsConfig={REGISTER_STEPS} />
      </div>
    </BeDonorProvider>
  );
};

export default BeDonor;
