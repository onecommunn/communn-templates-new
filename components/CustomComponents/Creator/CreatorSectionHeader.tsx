import React from "react";

interface ICreatorSectionHeader {
  title: string;
  description?: string;
}

const CreatorSectionHeader = ({
  title,
  description,
}: ICreatorSectionHeader) => {
  return (
    <div className="text-center md:mb-16 mb-6">
      <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#0C0407] font-inter">
        {title}
      </h2>
      {description && (
        <p className="text-[16px] text-[#0C0407] max-w-2xl mx-auto font-inter">
         {description}
        </p>
      )}
    </div>
  );
};

export default CreatorSectionHeader;
