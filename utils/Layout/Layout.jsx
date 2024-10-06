import React, { useEffect, useState } from "react";
import styles from "./Layout.module.scss";
import Header from "../Header/Header";
import { Logo } from "../Logo/Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Layout({ children }) {
  const pathname = usePathname();
  const [isWorkDetails, setIsWorkDetails] = useState(false);

  useEffect(() => {
    if (pathname?.split("/")[1] === "work" && pathname?.split("/")[2]) {
      setIsWorkDetails(true);
    } else {
      setIsWorkDetails(false);
    }
  }, [pathname]);

  return (
    <motion.div
      className={styles.layout}
     
    >
      <div className={styles.layout_elements}>
        <Header />
        <Logo />
        <p>
          A creative production studio founded by a former Olympian & an
          award‑winning director. We know sport.
        </p>
        {isWorkDetails && <span className={styles.line} />}

        {isWorkDetails && (
          <>
            <Link href="/work/origins-tyson-fury">origins-tyson-fury</Link>
            <Link href="/work/last-man-standing">last-man-standing</Link>
          </>
        )}
      </div>
      <div className={styles.page}>{children}</div>
    </motion.div>
  );
}
