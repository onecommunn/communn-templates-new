import * as React from "react";

type StarIconProps = React.SVGProps<SVGSVGElement> & {
  color?: string;        // fill color
  size?: number | string; // sets width; height auto-kept via viewBox ratio
};

export function StarIcon({
  color = "#FF7300",
  size = 48,
  ...rest
}: StarIconProps) {
  return (
    <svg
      width={size}
      height={typeof size === "number" ? (size * 47) / 48 : undefined}
      viewBox="0 0 48 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <path
        d="M23.9998 0.199219L27.9773 16.1647L42.7638 9.36454L32.9372 22.4731L47.3981 29.9589L31.1671 30.3394L34.413 46.4742L23.9998 33.8402L13.5866 46.4742L16.8326 30.3394L0.601562 29.9589L15.0625 22.4731L5.23588 9.36454L20.0223 16.1647L23.9998 0.199219Z"
        fill={color}
      />
    </svg>
  );
}
