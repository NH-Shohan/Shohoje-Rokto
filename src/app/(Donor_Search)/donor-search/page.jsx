import donors from "../../../data/donors.json";
import DonorCard from "../DonorCard";
import Search from "../Search";

const DonorSearch = () => {
  return (
    <div className="container">
      <Search />
      <DonorCard donors={donors} />
    </div>
  );
};

export default DonorSearch;
