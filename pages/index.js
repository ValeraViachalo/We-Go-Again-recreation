import HomePage from "@/components/HomePage/HomePage";
import Head from "next/head";
import Lenis from 'lenis'
import { useEffect } from "react";
import { motion } from "framer-motion";

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
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}>
      <Head />
      <HomePage />
    </motion.div>
  );
}
