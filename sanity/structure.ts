// import type {  StructureBuilder } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('stickie').title('Stickies'),
    ])
