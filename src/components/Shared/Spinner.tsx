import React from 'react';

type SpinnerPropType = {
   className?: string;
   color?: string; // Color of the spinner
   height?: string; // Height of the spinner
   width?: string; // Width of the spinner
};

const Spinner: React.FC<SpinnerPropType> = ({
   className = '',
   color = 'white', // Default color
   height = 'h-5', // Default height
   width = 'w-5', // Default width
}) => (
   <svg
      className={`animate-spin ${height} ${width} ${className}`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke={color} // Set stroke color based on prop
   >
      <circle className='opacity-25' cx='12' cy='12' r='10' strokeWidth='4' />
      <path
         className='opacity-75'
         fill={color} // Set fill color based on prop
         d='M4 12a8 8 0 018-8v8H4z'
      />
   </svg>
);

export default Spinner;
