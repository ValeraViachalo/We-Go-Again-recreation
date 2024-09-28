import { ScrollProvider } from "@/lib/Providers/ScrollProvider/ScrollProvider";
import s from "./HomePage.module.scss";

export default function HomePage() {
  return (
    <div className={s.home}>
      <ScrollProvider wrapper="#home-scroll">
        <div className={s.home_image_scroll} id="home-scroll">
          <div className={s.home_image_wrapper}>
            {new Array(10).fill(null).map((_, i) => (
              <span key={i} className={s.home_image} />
            ))}
          </div>
        </div>
      </ScrollProvider>
    </div>
  );
}
