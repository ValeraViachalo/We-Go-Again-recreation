import WorkDetailsPage from "@/components/WorkDetails/WorkDetails";
import { AnimatePresence } from "framer-motion";
import React from "react";

export default function WorkDetails({ data }) {
  return (
    <AnimatePresence mode="wait">
      <WorkDetailsPage data={data.work}/>
    </AnimatePresence>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getWorkData?slug=${slug}`,
      {
        cache: "no-cache",
        revalidate: 100,
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return { props: { data } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: {} };
  }
}
