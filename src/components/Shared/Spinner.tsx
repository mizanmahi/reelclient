const Spinner = () => (
   <svg
      className='animate-spin h-5 w-5 text-white'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
   >
      <circle className='opacity-25' cx='12' cy='12' r='10' strokeWidth='4' />
      <path
         className='opacity-75'
         fill='currentColor'
         d='M4 12a8 8 0 018-8v8H4z'
      />
   </svg>
);

export default Spinner;
