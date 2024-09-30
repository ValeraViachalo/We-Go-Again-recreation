import { useState, useEffect } from "react";
import s from "./HomePage.module.scss";
import Image from "next/image";
import content from "./home.json";

export default function HomePage() {
  return (
    <div className={s.home}>
      <div className={s.home_image_scroll} id="home-scroll">
        <div className={s.home_image_wrapper}>
          {content.works.map((currI, i) => (
            <Image
              src={currI.image}
              className={s.home_image}
              key={`image_${i}`}
              width={300}
              height={400}
              alt={currI.title}
            />
          ))}
        </div>
        <div className={s.infine_scroll_wrapper}>
          <div className={`${s.home_image_wrapper}`}>
            {content.works.map((currI, i) => (
              <Image
                src={currI.image}
                className={s.home_image}
                key={`image_${i}`}
                width={300}
                height={400}
                alt={currI.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}