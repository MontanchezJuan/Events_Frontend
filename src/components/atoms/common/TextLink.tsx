import React from 'react';

interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export const TextLink: React.FC<TextLinkProps> = ({ children, ...props }) => {
  return (
    <a {...props} className="text-blue-500 hover:underline text-left text-sm cursor-pointer">
      {children}
    </a>
  );
};


