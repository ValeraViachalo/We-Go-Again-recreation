import Link from "next/link";
import { Logo } from "../Logo/Logo";
import styles from "./Header.module.scss";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const linksList = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Work",
    link: "/work",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <ul className={styles.header__list_links}>
        {linksList.map((currLink, index) => (
          <li key={`header_link_${index}`}>
            <Link
              className={classNames(styles.header__link, {
                "shadow": pathname === currLink.link
              })}
              href={currLink.link}
            >
              <span>{currLink.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;