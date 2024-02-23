import donors from "../../../data/donors.json";
import DonorCard from "../DonorCard";
import Search from "../Search";

const DonorSearch = () => {
  return (
    <div className="container">
      <Search />

      <div className="grid grid-cols-4 gap-5 mt-10">
        {donors.map((donor, index) => (
          <DonorCard
            key={index}
            image={donor.image}
            name={donor.name}
            bloodGroup={donor.bloodGroup}
            availability={donor.availability}
            city={donor.city}
            gender={donor.gender}
            age={donor.age}
          />
        ))}
      </div>
    </div>
  );
};

export default DonorSearch;
