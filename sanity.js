import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2022-03-07",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
};

export const sanityClient = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);
