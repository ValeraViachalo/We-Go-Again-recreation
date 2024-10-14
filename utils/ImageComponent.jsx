import { urlFor } from "@/sanity";
import Image from "next/image";
import Link from "next/link";

export const ImageComponent = ({ project, styles }) => {
  return (
    <Link href={`/work/${project?.slug.current}`} className={styles}>
      <Image
        src={urlFor(project?.image).url()}
        fill
        alt={project?.slug.current}
        unoptomized
      />
    </Link>
  );
};
