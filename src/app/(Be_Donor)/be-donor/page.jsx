"use client";
import PersonalInfo from "../PersonalInfo";
import Stepper from "../Stepper";

const REGISTER_STEPS = [
  {
    name: "Personal Info",
    Component: () => <PersonalInfo />,
  },
  {
    name: "Medical Info",
    Component: () => <div>Medical Info</div>,
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
