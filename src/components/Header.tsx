import Image from "next/image";
import logo from "../../public/STFC-Logo.png";
import { Typography } from "@mui/material";
import styles from "./Header.module.css";

const Header = () => (
  <header className={styles.header}>
    <Image src={logo} alt="STFC logo" height={60} />
  </header>
);

export default Header;
