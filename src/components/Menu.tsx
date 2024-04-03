import { IoMenu } from "react-icons/io5";
import { VscFiles } from "react-icons/vsc";
import { MdOutlineTaskAlt } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";

export default function Menu() {
  return (
    <div className="flex flex-col bg-slate-950 items-center w-[6%] mx-5 mt-5 rounded-3xl py-5 gap-10">
      <p>
        <IoMenu size={30} color="white" />
      </p>
      <p>
        <VscFiles size={30} color="white" />
      </p>
      <p>
        <MdOutlineTaskAlt size={30} color="white" />
      </p>
      <p>
        <FaRegCalendarAlt size={30} color="white" />
      </p>
      <p>
        <LuMessagesSquare size={30} color="white" />
      </p>
    </div>
  );
}
