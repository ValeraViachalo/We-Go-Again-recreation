import { VideoPlayer } from "@/utils/VideoPlayer/VideoPlayer";
import s from "./WorksDetails.module.scss";
import { WorksPageTrasition } from "@/lib/helpers/anim";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import ReactPlayer from "react-player";

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0,
};

export default function WorkDetailsPage({ data }) {
  const [isPlayerActive, setIsPlayerActive] = useState(false);

  return (
    data && (
      <motion.main
        className={s.work_details}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <motion.div className={s.top}>
          <motion.h1 variants={WorksPageTrasition.textPresence} custom={0}>
            {data.name}
          </motion.h1>
          <motion.p
            className={"wrapper shadow " + s.paragraph}
            variants={WorksPageTrasition.textPresence}
            custom={1}
          >
            {data.description}
          </motion.p>
          {data.credits && (
            <div className="shadow">
              <motion.p variants={WorksPageTrasition.textPresence} custom={2}>
                Credits:
              </motion.p>
              <ul className={s.credits_list}>
                {data.credits.map((currC, i) => (
                  <motion.li
                    key={i}
                    variants={WorksPageTrasition.textPresence}
                    custom={i + 4}
                  >
                    {`${currC.role}: ${currC.name}`}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        <motion.div
          variants={WorksPageTrasition.videoWrapperPresence}
          layoutId="video"
          className={s.video_preview_wrapper}
          onClick={() => setIsPlayerActive(true)}
          transition={{ duration: 0.5, ease: [0.12, 0.73, 0.28, 0.99] }}
        >
          <motion.video
            variants={WorksPageTrasition.videoWrapperPresence}
            // variants={WorksPageTrasition.videoPreszence}
            loop
            muted
            autoPlay
            webkit-playsinline="true"
            playsInline
            className={s.video_preview}
          >
            <source src={data.previewUrl} />
          </motion.video>
        </motion.div>

        <AnimatePresence>
          {isPlayerActive && (
            <motion.div
              className={s.video_main_wrapper}
              layoutId="video"
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <VideoPlayer customClass={s.video_main} url={data.videoUrl} />
              <span
                className={s.video_main_bg}
                onClick={() => setIsPlayerActive(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
  
        <motion.div
          variants={WorksPageTrasition.background}
          className={s.background_wrapper}
        >
          <motion.video
            // variants={WorksPageTrasition.videoPresence}
            loop
            muted
            autoPlay
            webkit-playsinline="true"
            playsInline
            className={s.background}
          >
            <source src={data.previewUrl} />
          </motion.video>
        </motion.div>
      </motion.main>
    )
  );
}
