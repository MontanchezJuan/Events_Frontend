import { MdMenu } from "react-icons/md";
import { LogoButton } from "../atoms/templates/LogoButton";
import { NavMenu } from "../molecules/templates/NavMenu";

interface HeaderProps {
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: (value: boolean) => void;
}

export const Header = ({ isSidebarOpen, setIsSidebarOpen }: HeaderProps) => {
  return (
    <header className="flex h-[60px] justify-center bg-zinc-900 px-4">
      <div className="w-full max-w-[1128px]">
        <ul className="flex h-full items-center gap-4 py-4 sm:gap-6">
          {setIsSidebarOpen ? (
            <MdMenu
              className="cursor-pointer text-3xl"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          ) : (
            <LogoButton color="text-white dark:text-zinc-900" />
          )}

          {/* Espaciador */}
          <div className="grow" />

          <NavMenu />
        </ul>
      </div>
    </header>
  );
};
