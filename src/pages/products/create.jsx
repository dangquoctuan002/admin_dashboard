import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Ckeditor from "../../components/ckeditor/ckeditor";
import { IoClose } from "react-icons/io5";
import { FaImages } from "react-icons/fa";
import { AiFillGold } from "react-icons/ai";

import Detail from "../detail";
import P_Image from "../product_image";

const colors = [
  { name: "Red", code: "#FF0000" },
  { name: "Green", code: "#00FF00" },
  { name: "Blue", code: "#0000FF" },
  { name: "Yellow", code: "#FFFF00" },
  { name: "Black", code: "#000000" },
  { name: "White", code: "#FFFFFF" },
];

function create(props) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [showDetail, setShowDetail] = useState(true);
  const [showP_Image, setShowP_Image] = useState(false);

  useEffect(() => {
    // Fetch categories
    fetch("http://localhost:8000/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data.data))
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch brands
    fetch("http://localhost:8000/api/brands")
      .then((response) => response.json())
      .then((data) => setBrands(data.data))
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);

  const [selectedCode, setSelectedCode] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [selectedFrameSize, setSelectedFrameSize] = useState("S");
  const [selectedWheelSize, setSelectedWheelSize] = useState("24");
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [fileName, setFileName] = useState(null);
  const [fileNameImage, setFileNameImage] = useState(null);

  const formData = new FormData();

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      formData.append("image", file);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    try {
      const response = await fetch("http://localhost:8000/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.status === "error") {
        toast.error(data.message);
        return;
      }else{
        toast.success("valid photo");
        setFileNameImage(data.image_name);
      }

    } catch (error) {
      console.error("Error creating:", error);
      toast.error("No image uploaded.");
    }
  };

  const handleFrameSizeClick = (size) => {
    setSelectedFrameSize(size);
  };
  const handleWheelSizeClick = (size) => {
    setSelectedWheelSize(size);
  };
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const created = async () => {
    const code = selectedCode.trim();
    const name = selectedName.trim();
    const title = selectedTitle.trim();
    const price = selectedPrice;
    const quantity = selectedQuantity;
    const frame = selectedFrameSize;
    const wheel = selectedWheelSize;
    const color = selectedColor;
    const category_id = selectedCategory.trim();
    const brand_id = selectedBrand.trim();
    const description = selectedDescription.trim();
    const image = fileNameImage;

    if (!code) {
      toast.warning("Product code cannot be empty !");
      return;
    } else {
      setSelectedCode(code);
    }

    if (!name) {
      toast.warning("Product name cannot be empty !");
      return;
    } else {
      setSelectedName(name);
    }

    if (!title) {
      toast.warning("Product title cannot be empty !");
      return;
    } else {
      setSelectedTitle(title);
    }

    if (!price && price >= 0) {
      toast.warning("Product price cannot be empty and price >= 0 !");
      return;
    } else {
      setSelectedPrice(price);
    }

    if (!quantity && quantity >= 0) {
      toast.warning("Product quantity cannot be empty and quantity >= 0 !");
      return;
    } else {
      setSelectedQuantity(quantity);
    }

    if (!category_id) {
      toast.warning("Please select a category for the product !");
      return;
    } else {
      setSelectedCategory(category_id);
    }

    if (!brand_id) {
      toast.warning("Please select a brand for the product !");
      return;
    } else {
      setSelectedBrand(brand_id);
    }

    if (!description) {
      toast.warning("Product description cannot be empty !");
      return;
    } else {
      setSelectedDescription(description);
    }

    if (!image) {
      toast.warning("Product photo does not exist !");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          name: name,
          title: title,
          price: price,
          quantity: quantity,
          framesize: frame,
          wheelsize: wheel,
          color: color,
          category_id: category_id,
          brand_id: brand_id,
          description: description,
          image: image,
        }),
      });

      const data = await response.json();

      if (data.status === 0) {
        setSelectedCode(code);
        setSelectedName(name);
        setSelectedTitle(title);
        setSelectedPrice(price);
        setSelectedQuantity(quantity);
        setSelectedDescription(description);
        if (data.errors) {
          toast.error("422 Unprocessable Content");
          console.dir(data.errors);
        }

        if (data.message) {
          toast.warning(data.message);
        }
        return;
      } else {
        props.showModel(false);
        props.resetData();
        toast.success("Created success");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("An error occurred while creating the product.");
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
      <div className="w-[90%] h-[90vh] fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-200 overflow-y-auto z-50 hide-scrollbar">
        <form className="h-full px-8 py-2 " encType="multipart/form-data">
          <div className="w-full flex justify-between items-center flex-wrap">
            <h2 className="py-4">Add new product</h2>
            <div className="flex justify-center items-center gap-4">
              <div
                onClick={() => {
                  setShowP_Image(true);
                }}
                className="text-xl border-2  h-7 flex justify-center items-center cursor-pointer border-gray-100 rounded-md hover:scale-90 duration-300"
              >
                <span className="p-1" title="Add Image">
                  <FaImages />
                </span>
              </div>
              <div
                onClick={() => {
                  setShowDetail(true);
                }}
                className="text-xl border-2  h-7 flex justify-center items-center cursor-pointer border-gray-100 rounded-md hover:scale-90 duration-300"
              >
                <span className="p-1" title="Add Product detail">
                  <AiFillGold />
                </span>
              </div>
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
          <div className="flex justify-center items-start gap-4">
            <div className="w-1/2">
              <div className="flex justify-between items-center flex-wrap w-full p-4 mb-5 rounded-lg">
                <div className="Code w-1/2 mb-5 pr-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Code"
                  >
                    Code
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Code"
                    type="text"
                    placeholder="Product Code"
                    onChange={(e) => {
                      setSelectedCode(e.target.value);
                    }}
                    value={selectedCode}
                  />
                </div>

                <div className="Name w-1/2 mb-5 pl-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Name"
                  >
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Product Name"
                    onChange={(e) => {
                      setSelectedName(e.target.value);
                    }}
                    value={selectedName}
                  />
                </div>

                <div className="Title w-full mb-5">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Title"
                  >
                    Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Title"
                    type="text"
                    placeholder="Title"
                    onChange={(e) => {
                      setSelectedTitle(e.target.value);
                    }}
                    value={selectedTitle}
                  />
                </div>

                <div className="Price w-1/2 mb-5 pr-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Price"
                  >
                    Price
                  </label>

                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    min="0"
                    type="number"
                    placeholder="Price"
                    onChange={(e) => {
                      setSelectedPrice(e.target.value);
                    }}
                    value={selectedPrice}
                  />
                </div>

                <div className="Quantity w-1/2 mb-5 pl-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Quantity"
                  >
                    Quantity
                  </label>

                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="quantity"
                    min="0"
                    step="1"
                    type="number"
                    placeholder="Quantity"
                    onChange={(e) => {
                      setSelectedQuantity(e.target.value);
                    }}
                    value={selectedQuantity}
                  />
                </div>

                <div className="framesize w-1/2 mb-5 pr-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Framesize"
                  >
                    Frame size
                  </label>

                  <ul className="flex flex-wrap justify-evenly items-center">
                    {["S", "M", "L"].map((size) => (
                      <li
                        key={size}
                        className={`w-12 p-1 cursor-pointer border text-center ${
                          selectedFrameSize === size
                            ? "bg-purple-600 rounded-md text-white"
                            : "hover:bg-purple-600 bg-white rounded-md"
                        }`}
                        onClick={() => handleFrameSizeClick(size)}
                      >
                        {size}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="Wheelsize w-1/2 mb-5 pl-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Wheelsize"
                  >
                    Wheel size
                  </label>

                  <ul className="flex flex-wrap justify-evenly items-center">
                    {["24", "26", "28"].map((size) => (
                      <li
                        key={size}
                        className={`w-12 p-1 cursor-pointer border text-center ${
                          selectedWheelSize === size
                            ? "bg-purple-600 rounded-md text-white"
                            : "hover:bg-purple-600 bg-white rounded-md"
                        }`}
                        onClick={() => handleWheelSizeClick(size)}
                      >
                        {size}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="Category w-1/2 mb-5 pr-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Category"
                  >
                    Category
                  </label>

                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="Brand w-1/2 mb-5 pl-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Brand"
                  >
                    Brand
                  </label>

                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    id="brand"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Select a brand</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="Color w-full flex items-center justify-start ">
                  <label
                    className="block text-gray-700 text-sm font-bold mr-8"
                    htmlFor="Color"
                  >
                    Color
                  </label>

                  <ul className="flex flex-wrap justify-between items-center gap-4">
                    {colors.map((color) => (
                      <li
                        key={color.name}
                        className={`w-6 h-6 cursor-pointer border rounded-full hover:scale-90 duration-300
                      ${
                        selectedColor === color.code
                          ? "border-purple-600 border-2"
                          : "border-transparent"
                      }`}
                        style={{ backgroundColor: color.code }}
                        onClick={() => handleColorClick(color.code)}
                      />
                    ))}
                  </ul>
                </div>
              </div>

              <div className="btn-created flex items-center justify-center">
                <button
                  className="bg-purple-400 hover:bg-purple-600 text-white font-bold p-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={created}
                >
                  Create
                </button>
              </div>
            </div>

            <div className="w-1/2">
              <div className="Image my-4">
                <div className="flex justify-center items-start gap-8 flex-wrap">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center h-40 w-1/2 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className="w-52 max-w-52 max-h-36 rounded-sm object-contain hover:scale-90 duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                    )}
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <div className="h-4 text-center">
                  {selectedImage ? (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {" "}
                      {fileName}{" "}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="Description mb-4">
                <div className="w-full mt-4 p-4 rounded-lg">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Description"
                  >
                    Description
                  </label>
                  <Ckeditor
                    onChange={setSelectedDescription}
                    data={selectedDescription}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      
      {showDetail && (
        <>
          <Detail
            showModel={setShowDetail}
            //  resetData={fetchData}
          />
        </>
      )}

      {showP_Image && (
        <>
          <P_Image
            showModel={setShowP_Image}
            //  resetData={fetchData}
          />
        </>
      )}
    </>
  );
}

export default create;
