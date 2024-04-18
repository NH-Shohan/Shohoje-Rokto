import Image from "next/image";
import loading from "../../../public/assets/loadingSpinner.svg";

export const LoadingSpinner = ({ className }) => {
  return <Image src={loading} alt="Loading Svg" className={className} />;
};
