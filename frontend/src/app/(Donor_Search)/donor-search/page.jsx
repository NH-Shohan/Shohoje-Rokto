import { DonorSearchProvider } from "@/context/DonorSearchContext";
import { FilterProvider } from "@/context/FilterContext";
import donors from "../../../data/donors.json";
import DonorContainer from "../DonorContainer";
import Search from "../Search";

const DonorSearch = () => {
  return (
    <div className="container">
      <FilterProvider>
        <DonorSearchProvider>
          <Search />
          <DonorContainer donors={donors} />
        </DonorSearchProvider>
      </FilterProvider>
    </div>
  );
};

export default DonorSearch;
