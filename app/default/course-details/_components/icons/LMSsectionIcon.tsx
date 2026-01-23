import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  color?: string;
  size?: number | string;
};

const LMSsectionIcon = ({ color = "#969696", size = 16, ...rest }: Props) => {
  const height = typeof size === "number" ? (size * 52) / 48 : undefined;
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M5.20634 1.33333L10.793 1.33333C13.2197 1.33333 14.6663 2.78 14.6663 5.20667V7.5L1.33301 7.5L1.33301 5.20667C1.33301 2.78 2.77967 1.33333 5.20634 1.33333Z"
        fill={color}
      />
      <path
        d="M1.33301 8.50002H14.6663V10.7934C14.6663 13.22 13.2197 14.6667 10.793 14.6667H5.20634C2.77967 14.6667 1.33301 13.22 1.33301 10.7934L1.33301 8.50002Z"
        fill={color}
      />
    </svg>
  );
};

export default LMSsectionIcon;
