import React, { useState, useEffect } from "react";

import Search from "../../components/search";

import { IoCreate } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Create from "./create";
import Update from "./update";
import Deleted from "./delete";

function dataTable() {
  const [brands, setBrands] = useState([]);

  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [_id, set_id] = useState();
  const [_name, set_name] = useState();

  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:8000/api/brands?page=${pageIndex}&limit=${limit}`
    );
    const result = await response.json();
    setBrands(result.data);
    setTotalPage(result.totalPage);
  };

  useEffect(() => {
    fetchData();
  }, [pageIndex, limit]);

  const handlePageChange = (page) => {
    setPageIndex(page);
  };

  return (
    <>
      <div className="sm:ml-64 w-[calc(100% - 256px)] h-auto bg-slate-100">
        <div className="p-4 min-h-[calc(100vh-40px)]">
          <div className="flex items-center justify-center h-10 mb-4 rounded shadow">
            <Search />
          </div>

          <div className="w-full mb-2 rounded-xl  overflow-x-auto shadow bg-slate-100">
            <div className="shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="p-4">
                      <div className="flex items-center"></div>
                    </th>
                    <th className="px-6 py-3">Stt</th>
                    <th className="px-6 py-3">Brand Name</th>
                    <th className="px-6 py-3">Created At</th>
                    <th className="px-6 py-3">Updated At</th>
                    <th className="px-6 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {brands.map((brand) => (
                    <tr
                      key={brand.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          {/* <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label className="sr-only">checkbox</label> */}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap dark:text-white">
                        {brand.id}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap dark:text-white">
                        {brand.name}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap dark:text-white">
                        {new Date(brand.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap dark:text-white">
                        {new Date(brand.updated_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            className="font-medium text-xl dark:text-blue-500 hover:underline"
                            onClick={() => {
                              setShowUpdate(true);
                              set_id(brand.id);
                              set_name(brand.name);
                            }}
                          >
                            <MdEditSquare />
                          </button>
                          <button
                            className="font-medium text-xl dark:text-blue-500 hover:underline"
                            onClick={() => {
                              setShowDelete(true);
                              set_id(brand.id);
                              set_name(brand.name);
                            }}
                          >
                            <MdDeleteForever />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className=" flex items-center w-full px-4 bottom-3 h-10 rounded shadow ">
          <nav
            className="w-full flex items-center justify-between bg-white"
            aria-label="Table navigation"
          >
            <button
              onClick={() => {
                setShowCreate(true);
              }}
              className="hover:bg-gray-200 rounded-xl text-sm font-normal text-gray-500 dark:text-gray-400 p-1 flex items-center gap-1"
            >
              <IoCreate className="text-2xl" />
              <span>Create</span>
            </button>
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

      {showCreate && (
        <>
          <Create showModel={setShowCreate} resetData={fetchData} />
        </>
      )}
      {showUpdate && (
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
      )}

    </>
  );
}

export default dataTable;
