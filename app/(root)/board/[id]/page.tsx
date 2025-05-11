// stickie/1 or whatever the id is

import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STICKIE_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";

export const experimental_ppr = true;

const page = async ({params}: {params: Promise<{id: string}>}) => {

    const id = (await params).id;
    const post = await client.fetch(STICKIE_BY_ID_QUERY, { id });

    if (!post) return notFound();

    return (
    <>
      <section className="pink_container pattern !min-h-[330px]">
        <p className="tag mb-3">{formatDate(post._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>
      
      <section className="section_container">
        <Image src={post.image} alt={post.title}
        className="w-full h-auto rounded-xl" width={1000} height={1000} />
      </section>
    </>
  )
}

export default page