import { FilterProvider } from "@/context/FilterContext";
import donors from "../../../data/donors.json";
import DonorCard from "../DonorCard";
import Search from "../Search";

const DonorSearch = () => {
  return (
    <div className="container">
      <FilterProvider>
        <Search />
        <DonorCard donors={donors} />
      </FilterProvider>
    </div>
  );
};

export default DonorSearch;
