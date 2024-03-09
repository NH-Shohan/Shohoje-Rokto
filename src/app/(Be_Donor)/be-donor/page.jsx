"use client";
import { BeDonorProvider } from "@/context/BeDonorContext";
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
    Component: () => <div>Registration</div>,
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
