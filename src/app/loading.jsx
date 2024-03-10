import Image from "next/image";
import loadingImage from "../../public/assets/loading.svg";

const loading = () => {
  return (
    <div className="grid place-content-center h-[calc(100vh-200px)]">
      <Image src={loadingImage} alt="Loading Image" />
    </div>
  );
};

export default loading;
