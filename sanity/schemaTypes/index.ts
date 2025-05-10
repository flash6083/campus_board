import { author } from "@/sanity/schemaTypes/author";
import { stickie } from "@/sanity/schemaTypes/stickie";
import { type SchemaTypeDefinition } from 'sanity';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, stickie],
}
