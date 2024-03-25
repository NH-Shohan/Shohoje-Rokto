import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
  const path = usePathname();
  const isActive = path === href;

  return (
    <div className={`inline relative`}>
      <Link
        href={href}
        className={`hover:text-primary ${
          isActive ? "text-primary font-medium" : "text-foreground"
        }`}
      >
        {children}
      </Link>
      {isActive && <div className="w-5 h-[2px] rounded-full bg-primary"></div>}
    </div>
  );
};

export default NavLink;
