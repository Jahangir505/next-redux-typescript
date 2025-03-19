import Form from "@/components/Form";
import Table from "@/components/Table";
import { addPost, setPostList, updatePost } from "@/redux/actions/postActions";
import { AppDispatch, RootState } from "@/redux/store";
import { Post } from "@/types";
import axios from "axios";
import { GetServerSideProps } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [post, setPost] = useState<Post>({
    title: "",
    body: "",
    image: null,
    id: 0,
  });

  const [loading, setLoading] = useState(false);
  const { items } = useSelector((state: RootState) => state.items.postReducer);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!post.title || !post.body) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const newItem: Post = { ...post, id: Date.now() };
      await dispatch(addPost(newItem)); // Wait for dispatch
      setPost({ title: "", body: "", image: null, id: 0 }); // Reset form
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Failed to add post. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleUpdatePost = async (updatedItem: Post) => {
    setLoading(true);

    try {
      await dispatch(updatePost(updatedItem, post.id));
      setPost({ title: "", body: "", image: null, id: 0 });
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setPostList(posts));
  }, [dispatch, posts]);
  return (
    <div className="min-h-screen flex flex-col items-center px-6 sm:px-10 md:px-20 py-10 gap-8 md:gap-12">
      {/* Header */}
      <div className="text-center">
        <h1
          className={`${geistSans.variable} font-sans font-bold text-3xl sm:text-4xl md:text-5xl`}
        >
          Post App
        </h1>
        <p className={`${geistMono.variable} font-mono text-sm sm:text-base`}>
          by{" "}
          <a
            className="text-blue-500 hover:underline"
            href="https://github.com/jahangir505"
          >
            Jahangir
          </a>
        </p>
      </div>

      {/* Main Layout: Form + Table */}
      <main className="flex flex-col md:flex-row w-full gap-6 md:gap-12">
        {/* Form Section: Full width on mobile, sidebar on desktop */}
        <div className="w-full md:w-1/3">
          <Form
            post={post}
            setPost={setPost}
            handleSubmit={handleSubmit}
            handleUpdatePost={handleUpdatePost}
            loading={loading}
          />
        </div>

        {/* Table Section: Full width on mobile, main content on desktop */}
        <div className="w-full md:w-2/3 border rounded-lg shadow-md max-h-[450px] overflow-auto">
          <Table items={items} setPost={setPost} />
        </div>
      </main>
    </div>
  );
}

// ✅ Fetch data server-side
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return { props: { posts: response.data.slice(0, 10) } }; // Fetch only 10 posts
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { props: { posts: [] } };
  }
};
