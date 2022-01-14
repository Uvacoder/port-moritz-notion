export default interface Post {
  id: string;
  title: string;
  icon: {
    emoji: string;
    type: string;
  };
  excerpt?: string;
  slug: string | null;
  blocks?: [];
  createdAt: string | null;
  updatedAt: string;
}
