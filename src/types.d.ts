// Global Type declaration for Item
export type Post = {
  id: number;
  title: string;
  body?: string;
  image?: File | null; // Use File type for image
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
};
