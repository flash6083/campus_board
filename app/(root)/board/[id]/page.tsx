// stickie/1 or whatever the id is

import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STICKIE_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import markdownit from "markdown-it";
import { Suspense } from "react";

const md = markdownit();

export const experimental_ppr = true;

const page = async ({params}: {params: Promise<{id: string}>}) => {

    const id = (await params).id;
    const post = await client.fetch(STICKIE_BY_ID_QUERY, { id });

    const parsedContent = md.render(post?.details || "");

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

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center mb-3">
              <Image src={post.author.image} alt="avatar" width={64} height={64}
              className="rounded-full drop-shadow-lg"/>
              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h4 className="text-30-bold">Board details</h4>
          {parsedContent ? (
            <article className="prose max-w-4xl font-manrope break-all" dangerouslySetInnerHTML={{__html: parsedContent}} />
          ):(
              <p className="no-result">No details provided</p>
            )
          }
        </div>
        {/* EDITOR SELECTED STICKIES */}
        <hr className="divider"/>
        <Suspense fallback={<Skeleton className="view-skeleton"/>}>
          <View id={id}/>
        </Suspense>
      </section>
    </>
  )
}

export default page