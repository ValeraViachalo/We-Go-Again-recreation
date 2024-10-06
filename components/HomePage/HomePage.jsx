import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./HomePage.module.scss";
import content from "./home.json";

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        setScrollPosition(scrollTop);

        if (scrollTop + clientHeight >= scrollHeight - 1) {
          scrollRef.current.scrollTop = 1;
        } else if (scrollTop <= 0) {
          scrollRef.current.scrollTop = scrollHeight - clientHeight - 1;
        }
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className={styles.home}>
      <div
        className={styles.home_image_scroll}
        id="home-scroll"
        ref={scrollRef}
      >
        <div className={styles.home_image_wrapper}>
          {content.works.map((project, i) => (
            <ImageComponent
              key={`image_${i}`}
              project={project}
              index={i}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
        <div className={styles.infine_scroll_wrapper}>
          <div className={styles.home_image_wrapper}>
            {content.works.map((project, i) => (
              <ImageComponent key={`image_clone_${i}`} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ImageComponent = ({ project }) => {
  const { image, title, slug } = project;

  return (
    <Link href={`/work/${slug}`} className={styles.home_image}>
      <Image src={image} fill alt={title} />
    </Link>
  );
};
