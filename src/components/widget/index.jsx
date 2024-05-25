import React from "react";
import { IoPersonSharp } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { MdMonetizationOn } from "react-icons/md";
import { MdAccountBalanceWallet } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

const index = ({ type }) => {
  let data;

  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <IoPersonSharp
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <FaShoppingBag
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MdMonetizationOn
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <MdAccountBalanceWallet
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="flex items-center justify-center h-24 rounded-xl bg-gray-50 dark:bg-gray-800">
      <div className="widget flex justify-evenly flex-1 rounded-xl ">
        <div className="left flex flex-col justify-between">
          <span className="title font-bold text-sm text-[#A0A0A0]">
            {data.title}
          </span>
          <span className="counter font-light text-2xl">
            {data.isMoney && "$"} {amount}
          </span>
          <span className="link w-max text-xs border-b border-solid border-gray-400 ">
            {data.link}
          </span>
        </div>
        <div className="right flex flex-col justify-between">
          <div className="percentage positive flex items-center text-xl">
            {/* <MdKeyboardArrowUp
              style={{
                "font-size": "24px",
                "padding": "5px",
                "border-radius": "5px",
                "align-self": "flex-end",
              }}
            /> */}
            {diff} %
          </div>
          <div className="flex flex-row-reverse">
            {data.icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
