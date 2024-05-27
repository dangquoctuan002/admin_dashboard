// MenuItem.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const colors = [
  { name: "Red", code: "#FF0000" },
  { name: "Green", code: "#00FF00" },
  { name: "Blue", code: "#0000FF" },
  { name: "Yellow", code: "#FFFF00" },
  { name: "Black", code: "#000000" },
  { name: "White", code: "#FFFFFF" },
];

export default function MenuItem({
  id,
  isOpen,
  onToggle,
  onUpdate,
  initialData,
}) {
  const [selectedName, setSelectedName] = useState(
    initialData.selectedName || ""
  );
  const [selectedPrice, setSelectedPrice] = useState(
    initialData.selectedPrice || ""
  );
  const [selectedQuantity, setSelectedQuantity] = useState(
    initialData.selectedQuantity || ""
  );
  const [selectedFrameSize, setSelectedFrameSize] = useState(
    initialData.selectedFrameSize || "S"
  );
  const [selectedWheelSize, setSelectedWheelSize] = useState(
    initialData.selectedWheelSize || "24"
  );
  const [selectedColor, setSelectedColor] = useState(
    initialData.selectedColor || "#FFFFFF"
  );
  

  const [_Name, _setName] = useState("")

  useEffect(() => {
    if (isOpen) {
      setSelectedName(initialData.selectedName || "");
      setSelectedPrice(initialData.selectedPrice || "");
      setSelectedQuantity(initialData.selectedQuantity || "");
      setSelectedFrameSize(initialData.selectedFrameSize || "S");
      setSelectedWheelSize(initialData.selectedWheelSize || "24");
      setSelectedColor(initialData.selectedColor || "#FFFFFF");
    }
  }, [isOpen, initialData]);

  const handleFrameSizeClick = (size) => {
    setSelectedFrameSize(size);
  };
  const handleWheelSizeClick = (size) => {
    setSelectedWheelSize(size);
  };
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleUpdate = () => {
    if (!selectedName || !selectedPrice || !selectedQuantity) {
      toast.error("Please enter complete information !");
      return;
    }
    _setName(selectedName)
    onUpdate({
      id,
      selectedName,
      selectedPrice,
      selectedQuantity,
      selectedFrameSize,
      selectedWheelSize,
      selectedColor,
    });
    onToggle();
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="w-full h-8 mb-2 border border-gray-400 rounded cursor-pointer bg-gray-200"
    >
      <motion.span
        onClick={() => { onToggle, handleUpdate() }}
        whileTap={{ scale: 0.97 }}
        className="w-full h-full flex justify-between items-center px-4"
      >
        <motion.div> {_Name ? _Name : "Item"} </motion.div>

        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
          className="border-none rounded-[10px] text-2xl text-gray-700"
        >
          <svg width="15" height="15" viewBox="0 0 20 20">
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </motion.div>
      </motion.span>
      <motion.ul
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        className="p-4 bg-gray-200 flex flex-wrap mt-2"
      >
        <motion.li className="name w-full mb-3" variants={itemVariants}>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Product Name"
            onChange={(e) => {
              setSelectedName(e.target.value);
            }}
            value={selectedName}
            disabled={!isOpen}
          />
        </motion.li>

        <motion.li className="price min-w-[60px] w-1/2 mb-3 pr-2" variants={itemVariants}>
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
            disabled={!isOpen}
          />
        </motion.li>

        <motion.li className="quantity min-w-[60px] w-1/2 mb-3 pl-2" variants={itemVariants}>
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
            disabled={!isOpen}
          />
        </motion.li>

        <motion.li className="frame w-1/2 mb-3" variants={itemVariants}>
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
        </motion.li>

        <motion.li className="wheel w-1/2 mb-3" variants={itemVariants}>
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
        </motion.li>

        <motion.li className="Color w-full my-2 m-auto" variants={itemVariants}>
          <ul className="flex flex-wrap justify-between items-center gap-2">
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
        </motion.li>

        <motion.li className="btn-save mb-2 m-auto" variants={itemVariants}>
          {isOpen && (
            <span
              onClick={handleUpdate}
              className="block mx-auto mt-4 px-4 py-2 bg-purple-400 hover:bg-purple-700 text-white rounded"
            >
              Lưu
            </span>
          )}
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
}
