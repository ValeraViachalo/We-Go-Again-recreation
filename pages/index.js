import HomePage from "@/components/HomePage/HomePage";
import Head from "next/head";
import Lenis from 'lenis'
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      infinite: true,
      smoothWheel: true,
      orientation: 'vertical',
      gestureOrientation: 'both'
    });

    function raf(time) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <Head />
      <HomePage />
    </>
  );
}
