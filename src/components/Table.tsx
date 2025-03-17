import { deleteItem } from "@/redux/actions/itemActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const Table = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector(
    (state: RootState) => state.items.itemReducer.items
  );
  console.log(items);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Post name
            </th>
            <th scope="col" className="px-6 py-3 ">
              Body
            </th>
            <th
              scope="col"
              className="px-6 py-3 bg-gray-50 dark:bg-gray-800 w-[200px]"
            >
              Tags
            </th>
            <th scope="col" className="px-6 py-3">
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
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                {item.title}
              </th>
              <td className="px-6 py-4">
                {item?.body && item?.body.slice(0, 40)}
              </td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                {item?.tags &&
                  item?.tags.map((tag: string, i: number) => (
                    <span
                      className="inline-block m-1 px-2 py-1 font-semibold leading-6 text-gray-900 rounded-full bg-gray-100 dark:bg-gray-900 dark:text-gray-400 text-xs hover:bg-green-200 dark:hover:bg-green-700"
                      key={i}
                    >
                      {tag}
                    </span>
                  ))}
              </td>
              <td className="px-6 py-4">
                <button
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => dispatch(deleteItem(item.id))}
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
