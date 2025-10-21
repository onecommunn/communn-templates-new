import * as React from "react";

type SparkIconProps = React.SVGProps<SVGSVGElement> & {
  color?: string;          // fill color for the shape
  size?: number | string;  // controls width; height auto-kept by ratio
};

export function SparkIcon({
  color = "#FF7300",
  size = 48,
  ...rest
}: SparkIconProps) {
  // Original viewBox is 48(w) x 52(h)
  const height =
    typeof size === "number" ? (size * 52) / 48 : undefined;

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 48 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <path
        d="M23.3595 0.718962C23.4496 -0.0938207 24.5504 -0.0938207 24.6405 0.718962L25.3956 7.53744C26.3707 16.342 32.8496 23.2837 41.067 24.3284L47.431 25.1375C48.1897 25.2339 48.1897 26.4134 47.431 26.5099L41.067 27.3189C32.8496 28.3636 26.3707 35.3053 25.3956 44.1098L24.6405 50.9283C24.5504 51.7412 23.4496 51.7412 23.3595 50.9283L22.6044 44.1098C21.6294 35.3053 15.1504 28.3636 6.93291 27.3189L0.568948 26.5099C-0.189649 26.4134 -0.189649 25.2339 0.568948 25.1375L6.93291 24.3284C15.1504 23.2837 21.6294 16.342 22.6044 7.53744L23.3595 0.718962Z"
        fill={color}
      />
    </svg>
  );
}
