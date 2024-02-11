import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children, onClick }) => {
  const path = usePathname();
  const isActive = path === href;

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <div className={`inline relative`} onClick={handleClick}>
      <Link
        href={href}
        className={`hover:text-primary ${
          isActive ? "text-primary font-medium" : "text-foreground"
        }`}
      >
        {children}
      </Link>
    </div>
  );
};

export default NavLink;
