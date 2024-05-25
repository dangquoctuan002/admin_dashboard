import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function index(props) {
  // const notify = () => toast.success("Created success 😘😘😘");

  // const createCategory = async () => {
  //   setCategoryName(""); // Clear the input or reset state
  //   const name = categoryName.trim();

  //   if (!name) {
  //     toast.info("Category name cannot be empty !");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("http://localhost:8000/api/categories", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: name,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (data.status === 0) {
  //       setCategoryName(name);
  //       toast.info("The category name already exists !");
  //       return;
  //     } else {
  //       props.showModel(false);
  //       props.resetData();
  //       toast.success("Created success 😘😘😘");
  //     }
  //   } catch (error) {
  //     // console.error("Error creating category:", error);
  //     alert("An error occurred while creating the category.");
  //   }
  // };

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
        <h2>image</h2>
      
        </form>
      </div>
    </>
  );
}

export default index;
