import { RootState } from "@/redux/store";
import { Post } from "@/types";
import React from "react";
import { useSelector } from "react-redux";

interface FormProps {
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
  handleSubmit: (e: React.FormEvent) => void;
  handleUpdatePost: (post: Post, id: number) => void;
}

const Form = ({ post, setPost, handleSubmit, handleUpdatePost }: FormProps) => {
  const { loading } = useSelector(
    (state: RootState) => state.items.postReducer
  );
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {post.id ? "Update Post" : "Add Post"}
      </h2>

      <div>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
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
          className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer"
          onClick={(e) =>
            post.id ? handleUpdatePost(post, post.id) : handleSubmit(e)
          }
          disabled={loading}
        >
          {post.id ? "Update Post" : "Add Post"}
        </button>
      </div>
    </div>
  );
};

export default Form;
