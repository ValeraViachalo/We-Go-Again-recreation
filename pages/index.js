import HomePage from "@/components/HomePage/HomePage";
import Head from "next/head";
import Lenis from "lenis";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Home({ data }) {
  useEffect(() => {
    const lenis = new Lenis({
      infinite: true,
      smoothWheel: true,
      orientation: "vertical",
      gestureOrientation: "both",
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
    >
      <Head />
      <HomePage data={data.mainPage}/>
    </motion.div>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getMainPageData`,
      {
        cache: "no-cache",
        revalidate: 100
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    console.log("DATA ===>", data)

    return { props: { data } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: {} };
  }
}
