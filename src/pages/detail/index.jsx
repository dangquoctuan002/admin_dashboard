import "./scroll.css";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Ckeditor from "../../components/ckeditor/ckeditor";
import { IoClose } from "react-icons/io5";
import { FaImages } from "react-icons/fa";
import { AiFillGold } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import MenuItem from "../../components/menuItem";

const colors = [
  { name: "Red", code: "#FF0000" },
  { name: "Green", code: "#00FF00" },
  { name: "Blue", code: "#0000FF" },
  { name: "Yellow", code: "#FFFF00" },
  { name: "Black", code: "#000000" },
  { name: "White", code: "#FFFFFF" },
];

function index(props) {
  const [menuItems, setMenuItems] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [openItemId, setOpenItemId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState({});

  const [formData, setFormData] = useState({});

  const handleAdd = () => {
    if (
      openItemId !== null &&
      (!formData[openItemId]?.selectedName ||
        !formData[openItemId]?.selectedPrice ||
        !formData[openItemId]?.selectedQuantity)
    ) {

      toast.error("Please fill in the information before adding new information.");
      return;
    }
    const newId = nextId;
    setMenuItems([...menuItems, newId]);
    setFormData({
      ...formData,
      [newId]: {
        selectedName: "",
        selectedPrice: "",
        selectedQuantity: "",
        selectedFrameSize: "S",
        selectedWheelSize: "24",
        selectedColor: "#FFFFFF",
      },
    });
    setNextId(nextId + 1);
    setOpenItemId(newId);
  };


  const handleDelete = () => {
    if (openItemId !== null) {
      setMenuItems(menuItems.filter((item) => item !== openItemId));
      const updatedFormData = { ...formData };
      delete updatedFormData[openItemId];
      setFormData(updatedFormData);
      setOpenItemId(null);
    }
  };

  const handleUpdate = (data) => {
    setFormData((prev) => ({
      ...prev,
      [data.id]: data,
    }));
  };

  const handleToggle = (id) => {
    setOpenItemId(openItemId === id ? null : id);
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
      <div className="w-[50%] h-[70vh] fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-200 z-50">
        <form
          className="w-full h-full px-8 py-2 "
          encType="multipart/form-data"
        >
          <div className="w-full flex justify-between items-center flex-wrap">
            <h2 className="py-4">Add Product Variations</h2>
            <div className="flex justify-center items-center gap-4">
              <div
                onClick={() => {
                  props.showModel(false);
                }}
                className="text-xl border-2 w-7 h-7 flex justify-center items-center cursor-pointer border-gray-100 rounded-md hover:scale-90 duration-300"
              >
                <IoClose className="w-4 m-auto" />
              </div>
            </div>
          </div>
          <div className="w-full h-[calc(70vh-96px)]  flex justify-center items-start gap-4">
            <div className="w-3/4 h-full">
              <div className="hide-scrollbar w-full h-full p-4 mb-5 rounded-lg border-inherit overflow-y-auto bg-white">
                {menuItems.map((id) => (
                  <MenuItem
                    key={id}
                    id={id}
                    isOpen={id === openItemId}
                    onToggle={() => handleToggle(id)}
                    onUpdate={handleUpdate}
                    initialData={formData[id]}
                  />
                ))}
              </div>
            </div>

            <div className="w-1/4">
              <div className="btn-created flex items-center justify-center mb-5">
                <button
                  className="bg-purple-400 hover:bg-purple-600 text-white font-bold p-4 berder border-gray-500 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleAdd}
                >
                  <IoIosAdd />
                </button>
              </div>
              <div className="btn-edit flex items-center justify-center mb-5">
                <button
                  className="bg-purple-400 hover:bg-purple-600 text-white font-bold p-4 berder border-gray-500 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  // onClick={created}
                >
                  <CiEdit />
                </button>
              </div>
              <div className="btn-delete flex items-center justify-center mb-5">
                <button
                  className="bg-purple-400 hover:bg-purple-600 text-white font-bold p-4 berder border-gray-500 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleDelete}
                >
                  <MdDeleteOutline />
                </button>
              </div>
              <div className="btn-created flex items-center justify-center">
                <button
                  className="bg-purple-400 hover:bg-purple-600 text-white font-bold p-4 berder border-gray-500 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => {
                    console.dir(formData);
                  }}
                  // onClick={created}
                >
                  Oke
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default index;
