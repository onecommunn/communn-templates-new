import React from "react";

const ConsultingoServiceContent = ({
  primaryColor,
  secondaryColor,
  neutralColor,
  sections,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  sections: { title: string; description: string; image?: string }[];
}) => {
  return (
    <section
      className="relative font-lexend bg-[var(--neu)] overflow-hidden py-10 md:py-16"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="relative container mx-auto px-6 text-[var(--sec)] flex flex-col items-center md:max-w-[70%]">
        <div className="flex flex-col gap-8">
          {sections?.map?.((item, idx) => (
            <div key={idx}>
              <h3 className="font-semibold font-fraunces text-[40px]/[52px]">
                {item?.title}
              </h3>
              <p className="text-base text-[var(--sec)]/70">
                {item?.description}
              </p>
              {item?.image && (
                <div className="aspect-video mx-auto w-full md:max-w-[800px] md:max-h-[450px] my-6 rounded-[20px] overflow-hidden">
                  <img
                    src={
                      item?.image ??
                      "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/0b73cf6935b7661393ba40dee83e635a4b6f0bb8.png"
                    }
                    alt="image"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsultingoServiceContent;
