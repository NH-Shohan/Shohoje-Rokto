import SettingsNavbar from "./SettingsNavbar";

const SettingsLayout = ({ children }) => {
  return (
    <div className="space-y-5">
      <SettingsNavbar />
      {children}
    </div>
  );
};

export default SettingsLayout;
