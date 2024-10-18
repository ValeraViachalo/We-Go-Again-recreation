import React, { useState, useRef, useEffect, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import s from "./HomePage.module.scss";
import Link from "next/link";
import clsx from "clsx";
import { urlFor } from "@/sanity";
import Image from "next/image";
import classNames from "classnames";
import { useInView } from "react-intersection-observer";

export default function HomePage({ data }) {
  const scrollRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className={s.home}>
      <div className={s.home_image_scroll} id="home-scroll" ref={scrollRef}>
        <div className={s.home_image_wrapper}>
          {data?.works?.map((project, i) => (
            <ImageComponent
              key={`image_${i}`}
              project={project}
              index={i}
              styles={s.home_image}
              setActiveVideo={setActiveVideo}
            />
          ))}
        </div>
        <div className={s.infine_scroll_wrapper}>
          <div className={s.home_image_wrapper}>
            {data?.works?.map((project, i) => (
              <ImageComponent
                key={`image_clone_${i}`}
                project={project}
                index={i}
                styles={s.home_image}
                setActiveVideo={setActiveVideo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ImageComponent = ({ project, styles, setActiveVideo }) => {
  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView) {
      console.log(project.backgroundUrl);
      setActiveVideo(project?.backgroundUrl);
    }
  }, [inView]);

  return (
    <>
      <Link
        href={`/work/${project?.slug.current}`}
        className={classNames(styles, {
          [s.home_image_active]: inView,
        })}
        ref={ref}
      >
        <Image
          src={urlFor(project?.image).url()}
          fill
          alt={project?.slug.current}
          unoptomized
        />
      </Link>
      {/* <div className={s.home_background_wrapper}>
        <AnimatePresence>
          <motion.video
            loop
            muted
            autoPlay
            webkit-playsinline="true"
            playsInline
            className={s.home_background}
          >
            <source src={project.backgroundUrl} />
          </motion.video>
        </AnimatePresence>
      </div> */}
    </>
  );
};
