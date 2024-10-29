/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { MdClose, MdMenu } from "react-icons/md";

interface DrawerProps {
  children: React.ReactNode;
  contentClassName: string;
  isOpen: boolean;
  responsive: "md:hidden" | "sm:hidden";
  title?: string;
  toggleMenu: () => void;
}

interface ChildrenProps {
  children: React.ReactNode;
}

export const Drawer = ({
  children,
  contentClassName,
  isOpen,
  responsive,
  title,
  toggleMenu,
}: DrawerProps) => {
  const getTitle = () => {
    if (isOpen) {
      return <MdClose />;
    }

    return title ? (
      <span className="flex items-center gap-1">
        <p className="text-xl">{title}</p>
        <MdMenu />
      </span>
    ) : (
      <MdMenu />
    );
  };

  const contentChildren = React.Children.toArray(children).filter(
    (child: any) => child.type === Drawer.Content,
  );
  const responsiveChildren = React.Children.toArray(children).filter(
    (child: any) => child.type === Drawer.ResponsiveContent,
  );

  if (contentChildren.length === 0) {
    throw new Error(
      "Drawer must contain at least one Drawer.Content component.",
    );
  }

  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement(child) &&
      child.type !== Drawer.Content &&
      child.type !== Drawer.ResponsiveContent
    ) {
      throw new Error(
        "Drawer can only contain Drawer.Content and Drawer.ResponsiveContent as children.",
      );
    }
  });

  return (
    <>
      <div className="relative flex items-center overflow-y-auto">
        <button
          className={`text-3xl text-white ${responsive}`}
          onClick={toggleMenu}
        >
          {getTitle()}
        </button>

        <div
          className={`${
            isOpen ? "fixed inset-0" : "hidden"
          } z-50 flex items-center justify-center bg-zinc-900 text-white`}
        >
          <button
            className="absolute right-4 top-4 text-4xl"
            onClick={toggleMenu}
          >
            <MdClose />
          </button>

          <div className="flex flex-col items-center gap-6">
            {contentChildren}
          </div>
        </div>
      </div>

      <div className={contentClassName}>
        {responsiveChildren.length > 0 ? responsiveChildren : contentChildren}
      </div>
    </>
  );
};

Drawer.Content = ({ children }: ChildrenProps) => {
  return <>{children}</>;
};

Drawer.ResponsiveContent = ({ children }: ChildrenProps) => {
  return <>{children}</>;
};
