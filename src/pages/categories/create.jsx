import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function create(props) {
  const [categoryName, setCategoryName] = useState("");
  // const notify = () => toast.success("Created success 😘😘😘");

  const createCategory = async () => {
    setCategoryName(""); // Clear the input or reset state
    const name = categoryName.trim();

    if (!name) {
      toast.info("Category name cannot be empty !");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      });

      const data = await response.json();

      if (data.status === 0) {
        setCategoryName(name);
        toast.info("The category name already exists !");
        return;
      } else {
        props.showModel(false);
        props.resetData();
        toast.success("Created success 😘😘😘");
      }
    } catch (error) {
      // console.error("Error creating category:", error);
      alert("An error occurred while creating the category.");
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
              Category
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              type="text"
              placeholder="Category"
              onChange={(e) => {
                setCategoryName(e.target.value);
              }}
              value={categoryName}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={createCategory}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default create;
