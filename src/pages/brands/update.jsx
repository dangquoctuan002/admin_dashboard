import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function update(props) {
  const [brandName, setBrandName] = useState(props._name);

  const updated = async () => {
    setBrandName(""); // Clear the input or reset state
    const name = brandName.trim();

    if (!name) {
      toast.info("Brand name cannot be empty !");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/brands/${props._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: brandName,
          }),
        }
      );

      const data = await response.json();

      if (data.status === 0) {
        setBrandName(name);
        toast.info("The brand name already exists !");
        return;
      } else {
        if (props._name === name) {
          setBrandName(name);
          toast.info("You haven't changed anything !");
          return;
        } else {
          props.showModel(false);
          props.resetData();
          toast.success("Updated success 😘😘😘");
        }
      }
    } catch (error) {
      // console.error("Error updating category:", error);
      alert("An error occurred while updating the brand.");
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
              htmlFor="brand"
            >
              Brand
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="brand"
              type="text"
              placeholder="Brand"
              onChange={(e) => {
                setBrandName(e.target.value);
              }}
              value={brandName}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={updated}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default update;
