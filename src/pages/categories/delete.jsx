import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function deleted(props) {
  const [categoryName, setCategoryName] = useState(props._name);

  const deleteCategory = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/categories/${props._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (data.status === 0) {
        toast.error(data.message);
      } else {
        props.showModel(false);
        props.resetData();
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("An error occurred while deleting the category.");
    }
  };

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          props.showModel(false);
        }}
        className="w-screen h-screen bg-black-rgba fixed top-0 left-0 z-50"
      ></div>
      <div className="w-80 h-48 fixed top-[calc(50%-100px)] left-[calc(50%-160px)] z-50 ">
        <form className="bg-white shadow-md h-full px-8 pt-6 pb-8 mb-4 rounded-xl">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Are you sure you want to delete this category ?
            </label>
            <input
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              type="text"
              placeholder="Category"
              value={categoryName}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={deleteCategory}
            >
              Delete
            </button>

            <button
              className="bg-gray-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => props.showModel(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default deleted;
