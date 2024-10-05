import React, { useState, useRef, useEffect } from "react";
import s from "./HomePage.module.scss";
import Image from "next/image";
import { useInView } from "framer-motion";
import content from "./home.json";
import styles from "./HomePage.module.scss";
import { motion } from "framer-motion";

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const ImageComponent = ({ src, alt, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5 });

    useEffect(() => {
      if (isInView) {
        setActiveIndex((index - 1) % content.works.length);
      }
    }, [isInView, index]);

    return (
      <div ref={ref}>
        <Image
          src={src}
          width={300}
          height={400}
          alt={alt}
        />
      </div>
    );
  };

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
          {content.works.map((currI, i) => (
            <ImageComponent
              key={`image_${i}`}
              src={currI.image}
              alt={currI.title}
              index={i}
            />
          ))}
        </div>
        <div className={styles.infine_scroll_wrapper}>
          <div className={styles.home_image_wrapper}>
            {content.works.map((currI, i) => (
              <ImageComponent
                key={`image_clone_${i}`}
                src={currI.image}
                alt={currI.title}
                index={i + content.works.length}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={s.home_names_wrapper}>
        <motion.li className={s.home_names} style={{ y }}>
          {content.works.map((currI, i) => (
            <h1 key={i}>{currI.title}</h1>
          ))}
          {content.works.map((currI, i) => (
            <h1 key={i}>{currI.title}</h1>
          ))}
          {content.works.slice(-5).map((currI, i) => (
            <h1 key={i}>{currI.title}</h1>
          ))}
        </motion.li>
        <span className={s.home_names_visible}>
          <span className={s.home_names_active}></span>
        </span>
      </div>
    </div>
  );
}
