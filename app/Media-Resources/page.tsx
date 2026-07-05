import React from "react";
import { MdPermMedia } from "react-icons/md";

function page() {
  return (
    <>
            <div className="flex flex-col mt-12 items-center justify-center min-h-[60vh] bg-white">
        <a
          href="https://drive.google.com/" // Replace with your actual Google Drive link
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 p-6 rounded-lg shadow hover:bg-gray-100 transition"
        >
          <MdPermMedia className="text-6xl text-red-500" />
          <span className="text-xl font-semibold text-[#0C101C]">
            View Our Media Resources
          </span>
          <span className="text-sm text-gray-500">(Google Drive)</span>
        </a>
      </div>
    </>
  );
}

export default page;
