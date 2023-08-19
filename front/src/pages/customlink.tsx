import React,{ ReactNode } from 'react';


type CustomLinkProps = {
  href: string;
children: ReactNode;
};


export const CustomLink: React.FC<CustomLinkProps> = ({ href, children }) => {
    return (
      <div onClick={() => window.location.href = href}>
        {children}
      </div>
    );
  }

  
  