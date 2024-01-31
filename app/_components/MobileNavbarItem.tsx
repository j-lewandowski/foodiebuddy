import Link from "next/link";

interface MobileNavbarItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

const MobileNavbarItem = ({
  children,
  onClick,
  href,
}: MobileNavbarItemProps) => {
  if (href) {
    return (
      <Link
        href={href}
        className="text-lg text-dark-blue p-2 rounded-lg border-2 border-dark-blue flex-1 text-center"
      >
        {children}
      </Link>
    );
  }

  return (
    <div
      onClick={onClick}
      className="text-lg text-dark-blue p-2 rounded-lg border-2 border-dark-blue flex-1 text-center"
    >
      {children}
    </div>
  );
};

export default MobileNavbarItem;
