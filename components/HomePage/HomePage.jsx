// import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import s from "./HomePage.module.scss";
import { ScrollProvider } from "@/lib/Providers/ScrollProvider/ScrollProvider";

export default function HomePage() {
  // useEffect(() => {
  //   const lenis = new Lenis();

  //   function raf(time) {
  //     lenis.raf(time);

  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);
  // }, []);

  return (
    <div className={s.home}>
      
        <div className={s.home_image_scroll} id="home-scroll">
          <div className={s.home_image_wrapper}>
            {new Array(10).fill(null).map((_, i) => (
              <span key={i} className={s.home_image} />
            ))}
          </div>
        </div>

    </div>
  );
}
