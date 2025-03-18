import { deletePost } from "@/redux/actions/postActions";
import { AppDispatch } from "@/redux/store";
import { Post } from "@/types";
import { useDispatch } from "react-redux";

interface TableProps {
  items: any;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
}
const Table = ({ items, setPost }: TableProps) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs bg-blue-500 text-white uppercase dark:text-gray-400 ">
          <tr>
            <th scope="col" className="px-6 py-3 dark:bg-gray-800 w-[100px]">
              Post name
            </th>
            <th scope="col" className="px-6 py-3 w-[400px]">
              Body
            </th>
            <th scope="col" className="px-6 py-3 dark:bg-gray-800 w-[200px]">
              Tags
            </th>
            <th scope="col" className="px-6 py-3 w-[150px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: any, i: number) => (
            <tr
              className="border-b border-gray-200 dark:border-gray-700"
              key={i}
            >
              <th
                scope="row"
                className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                {item.title}
              </th>
              <td className="px-2 py-2">
                {item?.body && item?.body.slice(0, 90)}
              </td>
              <td className="px-2 py-2 bg-gray-50 dark:bg-gray-800">
                {item?.tags &&
                  item?.tags.map((tag: string, i: number) => (
                    <span
                      className="inline-block m-1 px-2 py-1 font-semibold leading-6 text-gray-900 rounded-full bg-gray-100 dark:bg-gray-900 dark:text-gray-400 text-xs hover:bg-green-200 dark:hover:bg-green-700 capitalize"
                      key={i}
                    >
                      {tag}
                    </span>
                  ))}
              </td>
              <td className="px-2 py-2 flex gap-3">
                <button
                  className="font-medium bg-blue-500 px-3 py-1 text-white dark:text-white-500 hover:underline cursor-pointer"
                  onClick={() => setPost(item)}
                >
                  Edit
                </button>
                <button
                  className="font-medium bg-red-500 px-3 py-1 text-white dark:text-blue-500 hover:underline cursor-pointer"
                  onClick={() => dispatch(deletePost(item.id))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
