import * as React from 'react';

const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 120"
    width="100%"
    height="100%"
    {...props}
  >
    <defs>
      <linearGradient id="jobTextGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0066FF" />
        <stop offset="100%" stopColor="#0095FF" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="none" />
    <g transform="translate(20, 75)">
      <text
        fontFamily="-apple-system, BlinkMacSystemFont, 'Montserrat', 'Segoe UI', Arial, sans-serif"
        fontSize={56}
      >
        <tspan fill="url(#jobTextGradient)" fontWeight={900} letterSpacing={1}>
          JOB
        </tspan>
        <tspan fill="#1E293B" fontWeight={400} letterSpacing={4}>
          BACKPACK
        </tspan>
      </text>
    </g>
  </svg>
);

export default SVGComponent;
