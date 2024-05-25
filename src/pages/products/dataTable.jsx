import React, { useState, useEffect } from "react";

import Search from "../../components/search";
import { IoIosAdd } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";

import { IoCreate } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Create from "./create";
// import Update from "./update";
// import Deleted from "./delete";

import ProductItem from "../../components/productItem";

function dataTable() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [limit, setLimit] = useState(7);

  const [showCreate, setShowCreate] = useState(true);
  // const [showUpdate, setShowUpdate] = useState(false);
  // const [showDelete, setShowDelete] = useState(false);

  // const [_id, set_id] = useState();
  // const [_name, set_name] = useState();
  const [_code, _setCode] = useState();

  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:8000/api/products?page=${pageIndex}&limit=${limit}`
    );

    const result = await response.json();
    setProducts(result.data);
    setLimit(result.limit)
    setTotalPage(result.totalPage);
  };

  const fetchDataCategory = async () => {
    const response = await fetch("http://localhost:8000/api/categories");
    const result = await response.json();
    setCategories(result.data);
  };

  useEffect(() => {
    fetchDataCategory();
    fetchData();
  }, [pageIndex, limit]);

  const handlePageChange = (page) => {
    setPageIndex(page);
  };

  return (
    <>
      <div className="sm:ml-64 w-[calc(100% - 256px)] bg-slate-100">
        <div className="p-4 min-h-screen relative">
          <div className="flex items-center justify-center h-10 rounded shadow">
            <Search />
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-8 py-4">
              <div
                onClick={() => {
                  setShowCreate(true);
                }}
                className="p-3 m-auto rounded-xl cursor-pointer"
              >
                <div className="w-48 h-52">
                  <div className="border  bg-white flex justify-center items-center h-full rounded-3xl hover:scale-90 duration-300">
                    <IoIosAdd /> <br />
                    <p>Add new product</p>
                  </div>
                </div>
              </div>

              {products.map((product) => (
                <div key={product.id} className="p-3 m-auto rounded-xl">
                  <div className="w-48 h-52">
                    <div className=" bg-white mx-auto h-full rounded-3xl">
                      <div className="">
                        <figure className="flex justify-center items-center relative">
                          <img
                            className="w-32 absolute "
                            src={product.image_url}
                            alt=""
                          />
                        </figure>
                      </div>

                      <div className="text-center mt-12">
                        <p className="text-xl font-bold"> {product.name} </p>
                        <p className="text-xs text-gray-400"> {product.code} </p>
                        <p className="text-sm px-4">{product.title}</p>
                        <div className="flex mt-8 justify-between items-center px-4">
                          <span className="text-xl">${product.price}</span>
                          <p className="flex gap-2">
                            <button className="text-xl border-2 w-7 h-7 border-gray-100 rounded-md hover:scale-90 duration-300">
                              <IoEyeOutline className="w-4 m-auto" />
                            </button>
                            <button className="text-xl border-2 w-7 h-7 border-gray-100 rounded-md hover:scale-90 duration-300">
                              <IoMdSettings className="w-4 m-auto" />
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>

          <div className="w-[calc(100%-32px)] absolute bottom-0 flex justify-between items-center h-10 px-4 rounded-md shadow bg-white">
            <div className="Category gay-2">
              <select
                // value={selectedCategory}
                // onChange={(e) => setSelectedCategory(e.target.value)}
                id="category"
                className="block w-full p-1 text-sm rounded-lg  bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-gray-600"
              >
                <option value="">Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <nav
              className="flex items-center justify-between bg-white"
              aria-label="Table navigation"
            >
              <ul className="inline-flex text-sm h-8">
                <li className="flex items-center">
                  <button
                    className={`px-3 py-1 ${
                      pageIndex === 1
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "bg-white text-gray-500"
                    } rounded flex items-center justify-center  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    onClick={() => handlePageChange(pageIndex - 1)}
                    disabled={pageIndex === 1}
                  >
                    {"<<"}
                  </button>
                </li>
                {[...Array(totalPage).keys()].map((page) => (
                  <li key={page + 1} className="flex items-center">
                    <button
                      className={`px-3 py-1 ${
                        page + 1 === pageIndex
                          ? "text-gray-300 cursor-default"
                          : "text-black"
                      } flex items-center justify-center  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                      onClick={() => handlePageChange(page + 1)}
                    >
                      {page + 1}
                    </button>
                  </li>
                ))}
                <li className="flex items-center">
                  <button
                    className={`px-3 py-1 ${
                      pageIndex === totalPage
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "bg-white text-gray-500"
                    } rounded flex items-center justify-center hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    onClick={() => handlePageChange(pageIndex + 1)}
                    disabled={pageIndex === totalPage}
                  >
                    {">>"}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {showCreate && (
        <>
          <Create showModel={setShowCreate} resetData={fetchData} />
        </>
      )}
      {/* {showUpdate && (
        <>
          <Update
            showModel={setShowUpdate}
            resetData={fetchData}
            _id={_id}
            _name={_name}
          />
        </>
      )}
      {showDelete && (
        <>
          <Deleted
            showModel={setShowDelete}
            resetData={fetchData}
            _id={_id}
            _name={_name}
          />
        </>
      )} */}
    </>
  );
}

export default dataTable;
