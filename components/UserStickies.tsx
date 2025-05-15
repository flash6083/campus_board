import { client } from "@/sanity/lib/client"
import { STICKIE_BY_AUTHOR_QUERY } from "@/sanity/lib/queries"
import StickieCard, { StickieCardType } from "./StickieCard"

const UserStickies = async ({id}: {id:string}) => {
    const stickies = await client.fetch(STICKIE_BY_AUTHOR_QUERY, {id})
    return (
        <>
            {
                stickies.length > 0 ? stickies.map(
                    (stickie: StickieCardType) => (
                        <StickieCard key = {stickie._id} post={stickie} />
                    )
                ) : (
                    <p className="no-result">No stickies found</p>
                )
            }
        </>
    )
}

export default UserStickies