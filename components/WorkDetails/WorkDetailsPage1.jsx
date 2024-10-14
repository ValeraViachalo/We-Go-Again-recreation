import { useContext } from "react";
import s from "./WorksDetails.module.scss";
import { SplitText } from "@cyriacbr/react-split-text";
import { anim, WorksPageTrasition } from "@/lib/helpers/anim";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

export default function WorkDetailsPage() {
  const pathname = usePathname();
  return (
    <motion.main
    className={s.work_details}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <h1>doddoop</h1>
      <div className={s.top}>
        <h1 {...anim(WorksPageTrasition.textPresence)} custom={0}>
          {data.title}
        </h1>
        <SplitText
          LineWrapper={({ lineIndex, children }) => (
            <p
              className="wrapper shadow"
              {...anim(WorksPageTrasition.textPresence)}
              custom={lineIndex + 1}
            >
              {children}
            </p>
          )}
          className={s.paragraph}
        >
          {data.descrition}
        </SplitText>
        <div className="shadow">
          <p {...anim(WorksPageTrasition.textPresence)} custom={2}>
            Credits:
          </p>
          <ul className={s.credits_list}>
            {data.credits.map((currC, i) => (
              <li key={i}
              {...anim(WorksPageTrasition.textPresence)}
              custom={i + 4}
              >{`${currC.role}: ${currC.name}`}</li>
            ))}
          </ul>
        </div>
      </div>
      <div {...anim(WorksPageTrasition.videoWrapperPresence)} className={s.video_preview_wrapper}>
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
      </div>
    </motion.main>
  );
}
