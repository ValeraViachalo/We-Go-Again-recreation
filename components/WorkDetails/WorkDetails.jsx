import { useContext } from "react";
import { DataContext } from "@/lib/Providers/DataProvider/DataProvider";
import s from "./WorksDetails.module.scss";
import { SplitText } from "@cyriacbr/react-split-text";
import { anim, WorksPageTrasition } from "@/lib/helpers/anim";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0 ,
};

export default function WorkDetailsPage() {
  const { data } = useContext(DataContext);
  const pathname = usePathname();

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
          {data.title}
        </motion.h1>
        <SplitText
          LineWrapper={({ lineIndex, children }) => (
            <motion.p
              className="wrapper shadow"
              variants={WorksPageTrasition.textPresence}
              custom={lineIndex + 1}
            >
              {children}
            </motion.p>
          )}
          className={s.paragraph}
        >
          {data.descrition}
        </SplitText>
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
        <video
          loop
          muted
          autoPlay
          webkit-playsinline="true"
          playsInline
          className={s.video_preview}
        >
          <source src={data.preview} />
        </video>
      </motion.div>
    </motion.main>
  );
}
