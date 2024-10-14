import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";

const query = groq`
    *[_type == "work" && slug.current == $slug][0] {
        ...,
        credits[]->,
        catergory[]->,
        video {
            asset-> {
            playbackId,
            assetId,
            filename,
            }
        }
    }
`;

export default async function handler(req, res) {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ message: "Slug parameter is required" });
  }

  try {
    console.log(`Attempting to fetch data from Sanity for slug: ${slug}`);
    const work = await sanityClient.fetch(query, { slug });

    if (!work) {
      console.log(`No data received from Sanity for slug: ${slug}`);
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json({ work });
  } catch (error) {
    console.error(`Error fetching data from Sanity for slug ${slug}:`, error);
    res.status(500).json({
      message: error.message,
    });
  }
}
