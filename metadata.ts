export type Metadata = {
  type: "post" | "author" | "link";
  id: string;
  tagId: string[];
  authorId: string;
  linkId: string[];
};
