import { PiSealCheckDuotone } from "react-icons/pi";

const Criteria = () => {
  return (
    <div>
      <div className="w-full">
        <h1 className="text-center">Donor Eligibility Criteria</h1>
        <p>
          Discover if you meet the criteria for blood donation and learn how to
          ensure a safe and successful donation. The following factors are
          commonly considered in eligibility criteria
        </p>
      </div>

      <div>
        <div>
          <PiSealCheckDuotone className="text-primary" />
          <h3>Who Can Donate?</h3>
        </div>
      </div>
    </div>
  );
};

export default Criteria;
