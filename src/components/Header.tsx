import Image from "next/image";
import logo from "../../public/STFC-Logo.png";
import styles from "./Header.module.css";

const Header = () => (
  <header className={styles.header}>
    {/* Ideally this should be a next Link rather than an a, but that runs into
    https://github.com/vercel/next.js/issues/42991*/}
    <a href="/">
      <Image src={logo} alt="STFC logo" height={60} />
    </a>
  </header>
);

export default Header;
