import React from 'react';

interface ContainerProps {
   children: React.ReactNode;
   className?: string;
   style?: React.CSSProperties;
}

const Container: React.FC<ContainerProps> = ({
   children,
   className = '',
   style,
}) => {
   return (
      <div
         className={`max-w-7xl mx-auto p-4 
                     sm:p-6 md:p-8 lg:p-10 
                     ${className}`}
         style={style}
      >
         {children}
      </div>
   );
};

export default Container;
