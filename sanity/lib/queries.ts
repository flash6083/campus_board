import { defineQuery } from "next-sanity";

export const STICKIE_QUERY = defineQuery(`
  *[
    _type == "stickie" &&
    defined(slug.current) &&
    (
      !defined($search) ||
      title match $search ||
      category match $search ||
      author->name match $search
    )
  ] | order(_createdAt desc){
    _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id, name, image, bio, username
    },
    views,
    description,
    category,
    image
  }
`);

export const STICKIE_BY_ID_QUERY = defineQuery(
  `*[_type == "stickie" && _id == $id][0]{
      _id,
      title,
      slug,
      _createdAt,
      author -> {
        _id, name, image, bio, username
      },
      views,
      description,
      category,
      image,
      details
}`
);

export const STICKIE_VIEWS_QUERY = defineQuery(
  `*[_type == "stickie" && _id == $id][0]{
    _id, views
  }`
)

export const AUTHOR_BY_GOOGLE_ID_QUERY = defineQuery(
  `*[_type == "author" && id == $id][0]{
      _id,
      id,
      name,
      username,
      email,
      image,
      bio
    }`
);