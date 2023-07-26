import { apiURL } from "../app/directus";
import Image from "next/image";

export default function Post({ post }) {
  const { title, text, image } = post;
  return (
    <div>
      <h2>{title}</h2>
      <p>{text}</p>
      <Image src={`${apiURL}/assets/${image}`} alt={title} />
    </div>
  );
}
