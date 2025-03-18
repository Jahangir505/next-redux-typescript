import Form from "@/components/Form";
import Table from "@/components/Table";
import { addPost, fetchPosts, updatePost } from "@/redux/actions/postActions";
import { AppDispatch, RootState } from "@/redux/store";
import { Post } from "@/types";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const [post, setPost] = useState<Post>({
    title: "",
    body: "",
    image: null,
    id: 0
  });

  const { items } = useSelector((state: RootState) => state.items.postReducer);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPost({ ...post, image: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!post.title || !post.body) {
      alert("Please fill in all fields.");
      return;
    }
    const newItem: Post = {
      title: post.title,
      body: post.body,
      image: post.image,
      id: Date.now()
    };
    dispatch(addPost(newItem));
    setPost({ title: "", body: "", image: null, id: 0 });
  };

  const handleUpdatePost = (updatedItem: Post) => {
    dispatch(updatePost(updatedItem, post.id));
    setPost({ title: "", body: "", image: null, id: 0 });
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <h1 className={`${geistSans.variable} font-sans font-bold text-4xl`}>
          Post App
        </h1>
        <p className={`${geistMono.variable} font-mono text-sm`}>
          by{" "}
          <a
            className="text-blue-500 hover:underline"
            href="https://github.com/jahangir505"
          >
            Jahangir
          </a>
        </p>
      </div>
      <main className="grid grid-cols-6 gap-[32px] row-start-2 items-center sm:items-start">
        <div className="col-span-2">

        <Form post={post} setPost={setPost} handleSubmit={handleSubmit} handleUpdatePost={handleUpdatePost} />
        </div>
        <div className="h-[450px] overflow-y-scroll col-span-4">
          <Table items={items} setPost={setPost} />
        </div>
      </main>
    </div>
  );
}
