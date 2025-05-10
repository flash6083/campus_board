import { formatDate } from "@/lib/utils";
import { Author, Stickie } from "@/sanity/types";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";


export type StickieCardType = Omit<Stickie, "author"> & {author?: Author}

const StickieCard = ({post}:{post: StickieCardType}) => {
  const {_createdAt, views, author, title, category, _id, image, description} = post;
  return (
    <li className="startup-card group">

      <div className="flex-between">
        <p className="startup-card_date">
          {formatDate(_createdAt)}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">
              {author?.name}
            </p>
          </Link>
          <Link href={`/board/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">
              {title}
            </h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image src="https://placehold.co/48x48" alt="placeholder" width={48} height={48}
          className="rounded-full"/>
        </Link>
      </div>
      <Link href={`/board/${_id}`}>
        <p className="startup-card_desc">
          {description}
        </p>
        <Image src={image!} alt="placeholder" width={300} height={300}
        className="startup-card_img"/>
      </Link>
      <div className="flex-between mt-5 gap-3">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">
            {category}
          </p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/board/${_id}`}>
            Details
          </Link>
        </Button>
      </div>
    </li>
  )
}

export default StickieCard