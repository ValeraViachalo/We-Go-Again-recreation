import React, { useEffect, useState } from "react";
import styles from "./Layout.module.scss";
import Header from "../Header/Header";
import { Logo } from "../Logo/Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import content from "@/components/HomePage/home.json";
import Image from "next/image";
import { ScrollProvider } from "@/lib/Providers/ScrollProvider/ScrollProvider";

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
    <motion.div className={styles.layout}>
      <div className={styles.layout_elements}>
        <Header />
        <Logo />
        <p>
          A creative production studio founded by a former Olympian & an
          award‑winning director. We know sport.
        </p>
        {isWorkDetails && <span className={styles.line} />}
        {isWorkDetails && <WorkList />}
      </div>
      <div className={styles.page}>{children}</div>
    </motion.div>
  );
}

const WorkList = () => {
  return (
    <ScrollProvider wrapper="#works-list">
      <div className={styles.works_list} id="works-list">
        <div className={styles.works_list_scroll} >
          {content.works.map((project, i) => (
            <Link
              href={`/work/${project.slug}`}
              className={styles.works_list_image}
              key={i}
            >
              <Image src={project.image} fill alt={project.title} />
            </Link>
          ))}
          {content.works.map((project, i) => (
            <Link
              href={`/work/${project.slug}`}
              className={styles.works_list_image}
              key={i}
            >
              <Image src={project.image} fill alt={project.title} />
            </Link>
          ))}
        </div>
      </div>
    </ScrollProvider>
  );
};
