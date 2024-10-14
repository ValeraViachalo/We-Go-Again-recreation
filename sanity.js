import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2022-03-07",
  useCdn: false,
  token:
    "sk5fs6pegbUQSuus1t3NNVz0RQtXsHfRGauKc3qon3IqFoZ0VuHRPOhb7r8fuu3thyuBraAZ5qwIGDyzTGXvFu27ZKslvtYum2zX5d6Ej5iJk3dAO5qXeCoFAbW7XQqtaSHqUd2OLJG0S959yvOUkzo8nFyEWGw8IXCcr1IIRExnwhw5IsOB",
};

export const sanityClient = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);
