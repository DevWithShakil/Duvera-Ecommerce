import React, { useEffect, useRef } from "react";
import { MdShoppingCart } from "react-icons/md";
import { motion } from "framer-motion";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();
  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);
  return (
    <div
      ref={rowContainer}
      className={`w-full my-12 items-center flex gap-3 scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap"
      }`}
    >
      {data &&
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[175] min-w-[275px] md:min-w[300px] md:w-300 my-12 bg-cardOverlay rounded-lg p-2 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-between"
          >
            <div className="w-full flex items-center justify-between">
              <motion.img
                whileTap={{ scale: 1.2 }}
                src={item?.imageUrl}
                alt="Fruits"
                className="w-40 -mt-8 drop-shadow-2xl"
              />
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center hover:shadow-md"
              >
                <MdShoppingCart className="text-white cursor-pointer " />
              </motion.div>
            </div>
            <div className="w-full flex flex-col items-end justify-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">{item?.calories}</p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-textColor font-semibold">
                  <span className="text-sm text-red-500">BDT</span>{" "}
                  {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RowContainer;