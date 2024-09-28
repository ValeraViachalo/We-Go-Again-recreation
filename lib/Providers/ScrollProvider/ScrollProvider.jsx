"use client"

import { useRef, useEffect, createContext } from "react";

export const ScrollContext = createContext(() => {});

function easeInOutExpo(x) {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

// ScrollProvider component

export const ScrollProvider = ({ children, wrapper }) => {
  const locomotiveScroll = useRef(null);

  const scrollTo = (currentLink, e) => {
    if (e) {
      e.preventDefault();
    }
    locomotiveScroll.current.scrollTo(currentLink, {
      duration: 1.7,
      easing: (x) => easeInOutExpo(x),
    });
  };

  const rangeScrollTo = (currentLink) => {
    locomotiveScroll.current.scrollTo(currentLink, {
      duration: 1.5,
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      (async () => {
        console.log(document.querySelector(wrapper));
        
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        locomotiveScroll.current = new LocomotiveScroll({
          lenisOptions: {
            wrapper: wrapper ? document.querySelector(wrapper) : window, 
            duration: 0.7,
            lerp: 0.1,
            smoothWheel: true,
            wheelMultiplier: 2,
          },
        });
      })();
    }
  }, [wrapper]);

  return (
    <ScrollContext.Provider value={{ scrollTo, rangeScrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
};
