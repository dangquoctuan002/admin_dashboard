import React from "react";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";

function index() {
  return (
    <div className="w-48 h-52">
      <div className=" bg-white mx-auto h-full rounded-3xl">
        <div className="">
          <figure className="flex justify-center items-center relative">
            <img
              className="w-32 absolute "
              src="https://img.zing.vn/products/taydu2/mansite/skin-2023/prod/taydu_mansite/char/images/thanh/char-1.png"
              alt=""
            />
          </figure>
        </div>

        <div className="text-center mt-12">
          <p className="text-xl font-bold">Red Bet Buger</p>
          <p className="text-xs ">350g</p>
          <p className="text-xs px-4">Wheat bun, vuggi pattay aimport";</p>
          <div className="flex mt-8 justify-between items-center px-4">
            <span className="text-xl">$120</span>
            <p className="flex gap-2">
              <button
                className="text-xl border-2 w-7 h-7 border-gray-100 rounded-md hover:scale-90 duration-300"
              >
                <IoEyeOutline className="w-4 m-auto"/>
              </button>
              <button
                className="text-xl border-2 w-7 h-7 border-gray-100 rounded-md hover:scale-90 duration-300"
              >
                <IoMdSettings className="w-4 m-auto"/>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
