import s from "./HomePage.module.scss";
import Image from "next/image";
import content from "./home.json";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HomePage() {
  const worksRef = useRef();

  const { scrollYProgress } = useScroll({
    target: worksRef.current,
    offset: ["0% 0%", "100% 100%"],
    layoutEffect: false,
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <div className={s.home} ref={worksRef}>
      <div className={s.home_image_scroll} id="home-scroll">
        <div className={s.home_image_wrapper}>
          {content.works.map((currI, i) => (
            <Image
              src={currI.image}
              className={s.home_image}
              key={`image_${i}`}
              width={300}
              height={400}
              alt={currI.title}
            />
          ))}
        </div>
        <div className={s.infine_scroll_wrapper}>
          <div className={`${s.home_image_wrapper}`}>
            {content.works.map((currI, i) => (
              <Image
                src={currI.image}
                className={s.home_image}
                key={`image_${i}`}
                width={300}
                height={400}
                alt={currI.title}
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
