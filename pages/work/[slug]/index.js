import WorkDetailsPage from "@/components/WorkDetails/WorkDetails";
import { DataProvider } from "@/lib/Providers/DataProvider/DataProvider";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

export default function WorkDetails() {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <DataProvider key={pathname} url={`/preparedData/${pathname}.json`}>
        <WorkDetailsPage />
      </DataProvider>
    </AnimatePresence> 
  );
}