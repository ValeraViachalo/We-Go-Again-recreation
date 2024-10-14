import s from "./WorksDetails.module.scss";
import { anim, WorksPageTrasition } from "@/lib/helpers/anim";
import { motion } from "framer-motion";
import MuxPlayer from "yt";

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0,
};

export default function WorkDetailsPage({ data }) {
  return (
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
          {data.descrition}
        </motion.p>
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
      </motion.div>
      <motion.div
        variants={WorksPageTrasition.videoWrapperPresence}
        className={s.video_preview_wrapper}
      >
        {/* <motion.video
          variants={WorksPageTrasition.videoPresence}
          loop
          muted
          autoPlay
          webkit-playsinline="true"
          playsInline
          className={s.video_preview}
        >
          <source src={data.preview} />
        </motion.video> */}
        <MuxPlayer
          playbackId={data.video.playbackId}
          metadata={{
            video_id: "video-id-54321",
            video_title: "Test video title",
            viewer_user_id: "user-id-007",
          }}
        />
      </motion.div>
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
          {/* <source src={data.preview} /> */}
        </motion.video>
      </motion.div>
    </motion.main>
  );
}
