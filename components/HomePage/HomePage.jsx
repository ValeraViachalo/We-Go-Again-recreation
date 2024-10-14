import React, { useState, useRef, useEffect, useContext } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import styles from "./HomePage.module.scss";
import content from "./home.json";
import { ImageComponent } from "@/utils/ImageComponent";

export default function HomePage({ data }) {
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
          {data?.works?.map((project, i) => (
            <ImageComponent
              key={`image_${i}`}
              project={project}
              index={i}
              setActiveIndex={setActiveIndex}
              styles={styles.home_image}
            />
          ))}
        </div>
        <div className={styles.infine_scroll_wrapper}>
          <div className={styles.home_image_wrapper}>
            {data?.works?.map((project, i) => (
              <ImageComponent key={`image_clone_${i}`} project={project} styles={styles.home_image}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


