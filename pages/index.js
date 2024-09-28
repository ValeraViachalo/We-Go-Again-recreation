import HomePage from "@/components/HomePage/HomePage";
import { ScrollProvider } from "@/lib/Providers/ScrollProvider/ScrollProvider";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head />
      <ScrollProvider>
        <HomePage />
      </ScrollProvider>
    </>
  );
}
