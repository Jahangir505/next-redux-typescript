import { Post } from "@/types";
import React from "react";
import { Loader } from "./icons/Loader";

interface FormProps {
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
  handleSubmit: (e: React.FormEvent) => void;
  handleUpdatePost: (post: Post, id: number) => void;
  loading: boolean;
}

const Form = ({
  post,
  setPost,
  handleSubmit,
  handleUpdatePost,
  loading,
}: FormProps) => {
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {post.id ? "Update Post" : "Add Post"}
      </h2>

      <div>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded text-black placeholder-gray-500  "
          placeholder="Title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />

        <textarea
          name=""
          className="w-full p-2 mb-4 border rounded"
          placeholder="Body text"
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
        ></textarea>
        {/* <input
          type="file"
          accept="image/*"
          className="w-full p-2 mb-4 border rounded"
          onChange={handleImageChange}
        /> */}
        <button
          className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer disabled:opacity-50 flex justify-center items-center gap-2"
          onClick={(e) =>
            post.id ? handleUpdatePost(post, post.id) : handleSubmit(e)
          }
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader />
              Processing...
            </>
          ) : post.id ? (
            "Update Post"
          ) : (
            "Add Post"
          )}
        </button>
      </div>
    </div>
  );
};

export default Form;
