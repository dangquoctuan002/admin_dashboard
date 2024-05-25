import React from "react";
import { Link } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { MdOutlineRateReview } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { MdBrandingWatermark } from "react-icons/md";

function index() {
  const data = [
    {
      title: "Categories",
      to: "/categories",
      icon: <MdCategory className="icon" />,
    },
    {
      title: "Brands",
      to: "/brands",
      icon: <MdBrandingWatermark className="icon" />,
    },
    {
      title: "Products",
      to: "/products",
      icon: <AiFillProduct className="icon" />,
    },
    {
      title: "Orders",
      to: "/",
      icon: <IoMdCart className="icon" />,
    },
    {
      title: "Users",
      to: "/",
      icon: <FaUsers className="icon" />,
    },
    {
      title: "Reviews",
      to: "/",
      icon: <MdOutlineRateReview className="icon" />,
    },
  ];

  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 overflow-hidden"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="top text-center">
            <Link
              to="/"
              className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <MdSpaceDashboard className="icon" />
              <span className="ms-3">Dashboard</span>
            </Link>
          </div>
          <ul className="space-y-2 font-medium mt-8">
            {data.map((value, index) => {
              return (
                <li key={index}>
                  <Link
                    to={value.to}
                    className="flex items-center px-4 py-3 ml-6 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
                  >
                    {value.icon}
                    <span className="ms-3">{value.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="bottom mt-[80px]">
            <div className="flex justify-center m-auto w-48 items-center gap-2 py-4 rounded-2xl text-xs bg-lime-400 text-white cursor-pointer">
              <IoMdSend className="icon" />
              <span>Send daily report</span>
            </div>
            <div className="flex justify-between items-center gap-3 m-5">
              <figure>
                <img
                  className="w-8 h-8 rounded-lg"
                  src="https://th.bing.com/th/id/OIP.gIY2zFXyzM6sPatl9Z4GoAHaHa?rs=1&pid=ImgDetMain"
                  alt=""
                />
              </figure>
              <span>Tuan Dang</span>
              <SlOptionsVertical className="icon cursor-pointer" />
            </div>
          </div>
        </div>
      </aside>
    </>
    // <div className="sidebar w-1/6 h-full bg-white rounded-l-3xl ">

    //   <div className="top text-center p-5">
    //     <Link to="/" style={{ textDecoration: "none" }}>
    //       <span className="logo">lamadmin</span>
    //     </Link>
    //   </div>
    //   <hr />
    //   <div className="center">
    //     <ul>
    //       <li className="">
    //         <Link
    //           to="/"
    //           style={{ textDecoration: "none" }}
    //           className="flex justify-center items-center gap-3 p-5 cursor-pointer"
    //         >
    //           <MdSpaceDashboard className="icon" />
    //           <span>Dashboard</span>
    //         </Link>
    //       </li>

    //       <li>
    //         <Link
    //           to="/categories"
    //           style={{ textDecoration: "none" }}
    //           className="flex justify-center items-center gap-3 p-5 cursor-pointer"
    //         >
    //           <MdCategory className="icon" />
    //           <span>Category</span>
    //         </Link>
    //       </li>

    //       <li>
    //         <Link
    //           to="/products"
    //           style={{ textDecoration: "none" }}
    //           className="flex justify-center items-center gap-3 p-5 cursor-pointer"
    //         >
    //           <AiFillProduct className="icon" />
    //           <span>Products</span>
    //         </Link>
    //       </li>

    //       <li>
    //         <Link
    //           to="/users"
    //           style={{ textDecoration: "none" }}
    //           className="flex justify-center items-center gap-3 p-5 cursor-pointer"
    //         >
    //           <FaUsers className="icon" />
    //           <span>Users</span>
    //         </Link>
    //       </li>

    //       <li>
    //         <Link
    //           to="/orders"
    //           style={{ textDecoration: "none" }}
    //           className="flex justify-center items-center gap-3 p-5 cursor-pointer"
    //         >
    //           <IoMdCart className="icon" />
    //           <span>Orders</span>
    //         </Link>
    //       </li>

    //       <li>
    //         <Link
    //           to="login"
    //           style={{ textDecoration: "none" }}
    //           className="flex justify-center items-center gap-3 p-5 cursor-pointer"
    //         >
    //           <TbLogout className="icon" />
    //           <span>Logout</span>
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>

    //   <div className="bottom mt-9">
    //     <div className="flex justify-center m-auto w-48 items-center gap-2 py-4 rounded-2xl text-xs bg-lime-400 text-white">
    //       <IoMdSend className="icon" />
    //       <span>Send daily report</span>
    //     </div>
    //     <div className="flex justify-between items-center gap-3 m-5">
    //       <figure>
    //         <img className="w-8 h-8 rounded-lg" src="https://th.bing.com/th/id/OIP.gIY2zFXyzM6sPatl9Z4GoAHaHa?rs=1&pid=ImgDetMain" alt="" />
    //       </figure>
    //       <span>Tuan Dang</span>
    //       <SlOptionsVertical className="icon" />
    //     </div>
    //   </div>
    // </div>
  );
}

export default index;
