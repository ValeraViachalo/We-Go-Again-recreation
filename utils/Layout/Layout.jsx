import React, { useEffect, useState } from "react";
import styles from "./Layout.module.scss";
import Header from "../Header/Header";
import { Logo } from "../Logo/Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ScrollProvider } from "@/lib/Providers/ScrollProvider/ScrollProvider";
import { urlFor } from "@/sanity";

export default function Layout({ children, data }) {
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
  const [works, setWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorks = async () => {
      setIsLoading(true);
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/getMainPageData`;
        console.log('Fetching from URL:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data.mainPage.works);
        
        if (data.mainPage.works && Array.isArray(data.mainPage.works)) {
          setWorks(data.mainPage.works);
        } else {
          console.error('Unexpected data structure:', data.mainPage.works);
          setError('Unexpected data structure');
        }
      } catch (error) {
        console.error('Error fetching works:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorks();
  }, []);

  return (
    <ScrollProvider wrapper="#works-list">
      <div className={styles.works_list} id="works-list">
        <div className={styles.works_list_scroll}>
          {works.map((project, i) => (
            <Link
              href={`/work/${project.slug.current}`}
              className={styles.works_list_image}
              key={i}
            >
              <Image src={urlFor(project.image).url()} fill alt={project.title} />
            </Link>
          ))}
        </div>
      </div>
    </ScrollProvider>
  );
};