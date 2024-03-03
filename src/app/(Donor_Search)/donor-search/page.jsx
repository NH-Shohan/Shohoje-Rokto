import { DonorSearchProvider } from "@/context/DonorSearchContext";
import { FilterProvider } from "@/context/FilterContext";
import donors from "../../../data/donors.json";
import DonorCard from "../DonorCard";
import Search from "../Search";

const DonorSearch = () => {
  return (
    <div className="container">
      <FilterProvider>
        <DonorSearchProvider>
          <Search />
          <DonorCard donors={donors} />
        </DonorSearchProvider>
      </FilterProvider>
    </div>
  );
};

export default DonorSearch;
