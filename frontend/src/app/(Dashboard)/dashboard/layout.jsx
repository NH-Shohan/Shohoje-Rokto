import DashboardNavbar from "../DashboardNavbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-2 h-[calc(100vh-60px)]">
      <DashboardNavbar className={"w-80"} />
      {children}
    </div>
  );
};

export default DashboardLayout;
