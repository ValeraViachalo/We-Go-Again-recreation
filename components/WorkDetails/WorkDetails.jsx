import { VideoPlayer } from "@/utils/VideoPlayer/VideoPlayer";
import s from "./WorksDetails.module.scss";
import { WorksPageTrasition } from "@/lib/helpers/anim";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useFollowPointer } from "@/lib/helpers/use-follow-pointer";
import clsx from "clsx";

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0,
};

export default function WorkDetailsPage({ data }) {
  const [isPlayerActive, setIsPlayerActive] = useState(false);
  const ref = useRef(null);
  const wrapperRef = useRef(null);
  const { x, y } = useFollowPointer(ref, wrapperRef);

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
          layoutId="video"
          onClick={() => setIsPlayerActive(true)}
          transition={{ duration: 0.5, ease: [0.12, 0.73, 0.28, 0.99] }}
          ref={wrapperRef}
        >
          <motion.div
            className={s.video_preview_wrapper}
            variants={WorksPageTrasition.videoWrapperPresence}
          >
            <motion.video
              variants={WorksPageTrasition.videoPresence}
              loop
              muted
              autoPlay
              webkit-playsinline="true"
              playsInline
              className={s.video_preview}
            >
              <source src={data.previewUrl} />
            </motion.video>
            <motion.div
              className={s.cursor}
              ref={ref}
              style={{ x, y }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              <svg
                className={s.cursor_icon}
                viewBox="0 0 22 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 12L5 22V2L19 12Z" fill="white" />
              </svg>
            </motion.div>
          </motion.div>
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
          className={clsx(s.background_wrapper, {
            [s.background_wrapper_active]: isPlayerActive
          })}
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
