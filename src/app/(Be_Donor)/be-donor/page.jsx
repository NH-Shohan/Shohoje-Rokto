"use client";
import MedicalInfo from "../MedicalInfo";
import PersonalInfo from "../PersonalInfo";
import Stepper from "../Stepper";

const REGISTER_STEPS = [
  {
    name: "Personal Info",
    Component: () => <PersonalInfo />,
  },
  {
    name: "Medical Info",
    Component: () => <MedicalInfo />,
  },
  {
    name: "Registration",
    Component: () => <div>Registration</div>,
  },
];

const BeDonor = () => {
  return (
    <div className="container">
      <Stepper stepsConfig={REGISTER_STEPS} />
    </div>
  );
};

export default BeDonor;
