import type { CSSProperties } from "react";

interface Props {
  style?: CSSProperties;
}

export default function LogoIcon({ style }: Props) {
  return (
    <svg
      style={{ stroke: "#333", ...style }}
      viewBox="0,0,600,600"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="30"
      fill="none"
    >
      <g>
        <line y2="500" x2="300" y1="100" x1="300" />
        <line y2="100" x2="500" y1="100" x1="285" />
        <line y2="500" x2="315" y1="500" x1="100" />
        <ellipse ry="64" rx="64" cy="300" cx="175" />
        <ellipse ry="64" rx="64" cy="300" cx="425" />
      </g>
    </svg>
  );
}
