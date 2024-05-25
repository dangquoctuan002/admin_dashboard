import React from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import Widget from "../../components/widget";
import Search from "../../components/search";
import Featured from "../../components/featured";
import Chart from "../../components/chart";

function index() {
  return (
    <div className="w-screen h-screen">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <Sidebar />

      <div className="p-4 sm:ml-64 h-screen bg-slate-100">
        <div className="">
          <div className="flex items-center justify-center h-10 mb-4 rounded shadow-[2px_4px_10px_1px_rgba(201, 201, 201, 0.47)]">
            <Search />
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <Widget type="user" />
            <Widget type="order" />
            <Widget type="earning" />
            <Widget type="balance" />          
          </div>

          <div className="flex items-center justify-center h-auto min-h-48 mb-4 rounded dark:bg-gray-800">
            <div className="charts flex py-[20px] gap-5">
              <Featured />
              <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;




    // <div className="bg-stone-950 p-4 w-screen h-screen overflow-hidden">
    //   <div className="flex">
    //     <Sidebar />

    //     <div className="w-5/6 h-full bg-stone-200 rounded-r-3xl overflow-auto">
    //       <Search />

    //       <div className="bg-zinc-600 h-[inherit]">
    //         <Navbar />
    //         <div className="widgets">
    //           <Widget type="user" />
    //           <Widget type="order" />
    //           <Widget type="earning" />
    //           <Widget type="balance" />
    //         </div>
    //         <div className="charts">
    //            <Featured />

    //           <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />

    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
