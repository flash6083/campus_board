import SearchForm from "@/components/SearchForm";
import StickieCard, { StickieCardType } from "@/components/StickieCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STICKIE_QUERY } from "@/sanity/lib/queries";


export default async function Home({searchParams}: {searchParams: Promise<{ query?: string }>} ) {
  
  const query = (await searchParams).query;

  const params = {search : query || null};

  const {data: posts} = await sanityFetch({query: STICKIE_QUERY, params});

  return (
    <>
      <section className="pink_container pattern">
        <h1 className="heading">Got Something to Say? Pin It.</h1>
        <p className="sub-heading !max-w-3xl">
        From shoutouts to updates, it all lands on the Campus Board.Your thoughts, your stories — all on the Campus Board.
        </p>
        <SearchForm query={query}/>
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : "All Stickies"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (posts.map((post: StickieCardType)=>(
            <StickieCard key={post?._id} post={post}/>
          )))
        : (
          <p className="no-results">No stickies found</p>
        )
        }
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}
