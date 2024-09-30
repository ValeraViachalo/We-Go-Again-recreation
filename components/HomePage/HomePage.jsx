import { useEffect, useRef, useState } from "react";
import s from "./HomePage.module.scss";
import { ScrollProvider } from "@/lib/Providers/ScrollProvider/ScrollProvider";

export default function HomePage() {
  const [images, setImages] = useState(new Array(10).fill(null));
  const scrollRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Добавляем новые изображения при достижении конца
          setImages((prevImages) => [
            ...prevImages,
            ...new Array(5).fill(null),
          ]);
        }
      });
    }, options);

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => {
      if (scrollRef.current) {
        observer.unobserve(scrollRef.current);
      }
    };
  }, []);

  return (
    <div className={s.home}>
      <div className={s.home_image_scroll} id="home-scroll">
        <div className={s.home_image_wrapper}>
          {images.map((_, i) => (
            <span key={i} className={s.home_image} />
          ))}
          <div ref={scrollRef} style={{ height: "1px" }} />
        </div>
      </div>
    </div>
  );
}
