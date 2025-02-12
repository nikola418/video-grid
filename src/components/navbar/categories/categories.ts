export type Category =
  | "Nature"
  | "Science"
  | "Art"
  | "Technology"
  | "Travel"
  | "Any";

export const categories: Record<Category, string | undefined> = {
  Any: undefined,
  Art: "art",
  Nature: "nature",
  Science: "science",
  Technology: "technology",
  Travel: "travel",
};
