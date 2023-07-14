import Image from "next/image";
import logo from "../../public/STFC-Logo.png";
import styles from "./Header.module.css";
import Link from "next/link";

const Header = () => (
  <header className={styles.header}>
    <Link href="/">
      <Image src={logo} alt="STFC logo" height={60} />
    </Link>
  </header>
);

export default Header;
