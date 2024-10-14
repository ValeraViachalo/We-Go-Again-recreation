import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";

const query = groq`
    *[_type == "mainPage"][0] {
        ...,
        works[]->,
    }
`;

export default async function handler(req, res) {
  try {
    console.log("Attempting to fetch data from Sanity...");
    const mainPage = await sanityClient.fetch(query);

    if (!mainPage) {
      console.log("No data received from Sanity");
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json({ mainPage });
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    res.status(500).json({
      message: error.message,
    });
  }
}
