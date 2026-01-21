import Image from "next/image";
import Link from "next/link";
import React from "react";


const CreateHeader = () => {
  return (
    <header className="flex items-center justify-center py-3 px-1 md:px-10 font-montserrat">
      <div className="flex items-center gap-2">
        {/* Replace with your actual small horizontal logo path */}
        <Image
          src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Group 238944.svg"
          alt="Logo"
          width={24}
          height={24}
          unoptimized
        />
        <span className="tracking-tight font-quattrocento font-bold text-2xl">
          <span className="text-[#2952A2]">c</span>
          <span className="text-[#50A1CA]">o</span>
          <span className="text-[#3B9B7F]">m</span>
          <span className="text-[#227727]">m</span>
          <span className="text-[#7FC41B]">u</span>
          <span className="text-[#FE7F06]">n</span>
          <span className="text-[#DA0242]">n</span>
          <span
            className="bg-clip-text text-transparent text-sm pr-1 "
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(41, 82, 162, 0.8) 6.3%, rgba(80, 161, 202, 0.8) 38.76%, rgba(59, 155, 127, 0.8) 68%)",
            }}
          >
            .io
          </span>
        </span>
      </div>
      {/* <Link
        href={"https://communn.io/admin"}
        target="_blank"
        className="font-medium text-white bg-[#2653A3] px-[20px] py-[10px] rounded-[8px] text-sm md:md"
      >
        Create
      </Link> */}
    </header>
  );
};

export default CreateHeader;
