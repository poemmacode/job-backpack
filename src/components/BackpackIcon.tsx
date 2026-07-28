import * as React from 'react';

const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 400 400"
    width="100%"
    height="100%"
    {...props}
  >
    <defs>
      <linearGradient id="backpackGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0066FF" />
        <stop offset="50%" stopColor="#00A8FF" />
        <stop offset="100%" stopColor="#00D2A0" />
      </linearGradient>
    </defs>
    <g transform="translate(50, 50)">
      <path
        d="M 125,75 C 125,52 175,52 175,75"
        fill="none"
        stroke="url(#backpackGrad)"
        strokeWidth={16}
        strokeLinecap="round"
      />
      <path
        d="M 70,135 L 70,265 C 70,295 45,295 45,250 L 45,140"
        fill="none"
        stroke="url(#backpackGrad)"
        strokeWidth={16}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 230,135 L 230,265 C 230,295 255,295 255,140"
        fill="none"
        stroke="url(#backpackGrad)"
        strokeWidth={16}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 85,270 L 85,150 C 85,80 215,80 215,150 L 215,270 C 215,295 85,295 85,270 Z"
        fill="none"
        stroke="url(#backpackGrad)"
        strokeWidth={17}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={118} cy={255} r={9} fill="url(#backpackGrad)" />
      <path
        d="M 118,255 L 118,225 C 118,200 150,200 150,175 L 150,115"
        fill="none"
        stroke="url(#backpackGrad)"
        strokeWidth={13}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 126,138 L 150,96 L 174,138"
        fill="none"
        stroke="url(#backpackGrad)"
        strokeWidth={13}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 182,240 L 182,175"
        fill="none"
        stroke="url(#backpackGrad)"
        strokeWidth={13}
        strokeLinecap="round"
      />
      <circle cx={182} cy={167} r={8.5} fill="url(#backpackGrad)" />
    </g>
  </svg>
);

export default SVGComponent;
