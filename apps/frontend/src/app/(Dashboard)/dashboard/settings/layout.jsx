import { Separator } from "@/components/ui/separator";
import SettingsNavbar from "./SettingsNavbar";

const SettingsLayout = ({ children }) => {
  return (
    <div>
      <SettingsNavbar />
      <Separator className="my-5 mb-10" />
      {children}
    </div>
  );
};

export default SettingsLayout;
