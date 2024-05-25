
import { MdMoreVert } from "react-icons/md";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

const index = () => {
  return (
    <div className="featured rounded-xl grow-[2] shrink-[1] basis-[0%] p-[10px] shadow-[2px_4px_10px_1px_rgba(201, 201, 201, 0.47)] bg-white">
      <div className="top flex items-center justify-between text-gray-500">
        <h1 className="title text-base font-medium">Total Revenue</h1>
        <MdMoreVert />
      </div>

      <div className="bottom flex items-center justify-between p-5 flex-col gap-4">
        <div className="featuredChart w-[100px] h-[100px]">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title font-medium text-gray-500">Total sales made today</p>
        <p className="amount text-3xl">$420</p>
        <p className="desc text-xs text-gray-500 font-light text-center">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary w-[100%] flex items-center justify-center">
          <div className="item text-center">
            <div className="itemTitle text-sm text-grap-500">Target</div>
            <div className="itemResult flex items-center mt-[10px] text-sm negative">
              <MdKeyboardArrowDown />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item text-center">
            <div className="itemTitle text-sm text-grap-500">Last Week</div>
            <div className="itemResult flex items-center mt-[10px] text-sm positive">
              <MdKeyboardArrowUp />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item text-center">
            <div className="itemTitle text-sm text-grap-500">Last Month</div>
            <div className="itemResult flex items-center mt-[10px] text-sm positive">
              <MdKeyboardArrowUp />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
