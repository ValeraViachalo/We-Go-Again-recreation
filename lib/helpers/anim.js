export const anim = (variants) => {
  return {
    initial: "initial",
    animate: "animate",
    exit: "exit",
    variants,
  };
};

const pover4Out = [0.12, 0.73, 0.28, 0.99];
const pover4In = [0.49, 0.01, 0.8, 0.31];
const easeOutQuint = [0.22, 1, 0.36, 1];

export const WorksPageTrasition = {
  textPresence: {
    initial: {
      y: "80%",
      clipPath: "inset(0% 0% 100%)",
    },
    exit: (i) => ({
      y: "-50%",
      clipPath: "inset(100% 0% 0%)",
      transition: {
        duration: 0.7,
        delay: 0 ,
        ease: pover4Out,
      },
    }),
    animate: (i) => ({
      y: "0%",
      clipPath: "inset(0% 0% 0%)",
      transition: {
        duration: 0.7,
        delay: i * 0.07 + 0.3,
        ease: pover4Out,
      },
    }),
  },
  videoWrapperPresence: {
    initial: {
      scale: 0,
      transformOrigin: "bottom",
    },
    animate: {
      scale: 1,
      transition: {
        duration: 1,
        ease: pover4Out
      },
      transitionEnd: {
        transformOrigin: "top",
      }
    },
    exit: {
      scale: 0,
      transition: {
        duration: 0.5,
        ease: pover4In
      },
    }
  }
};
