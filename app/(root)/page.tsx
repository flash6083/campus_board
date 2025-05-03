import SearchForm from "@/components/SearchForm";
import StickieCard from "@/components/StickieCard";


export default async function Home({searchParams}: {searchParams: Promise<{ query?: string }>} ) {
  const query = (await searchParams).query;
  const posts = [{
    _createdAt: new Date(),
    views: 95,
    author:{
      _id: 1,
      name: "Dharampal Singh",
    },
    _id: 1,
    description: 'This is a description',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Electronics',
    title: 'Lost laptop'
  }]
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
          {posts?.length > 0 ? (posts.map((post: StickieCardType, index:number)=>(
            <StickieCard key={post?._id} post={post}/>
          )))
        : (
          <p className="no-results">No stickies found</p>
        )
        }
        </ul>
      </section>
    </>
  );
}
