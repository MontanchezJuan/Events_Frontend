import { MdMenu } from "react-icons/md";
import { RoleName } from "../../api/interfaces/user";
import useStore from "../../store/useStore";
import { LogoButton } from "../atoms/templates/LogoButton";
import { NavMenu } from "../molecules/templates/NavMenu";

interface HeaderProps {
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: (value: boolean) => void;
}

export const Header = ({ isSidebarOpen, setIsSidebarOpen }: HeaderProps) => {
  const { name: role } = useStore((store) => store.user.role);

  const NavMenuRoles: RoleName[] = ["user", "unauthenticated"];
  const SidebarRoles: RoleName[] = ["admin", "organizer"];

  return (
    <header className="flex h-[60px] justify-center bg-zinc-900 px-4">
      <div className="w-full max-w-[1128px]">
        <ul className="flex h-full items-center gap-4 py-4 sm:gap-6">
          {SidebarRoles.includes(role) &&
            (setIsSidebarOpen ? (
              <MdMenu
                className="cursor-pointer text-3xl"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              />
            ) : (
              <LogoButton color="text-white dark:text-zinc-900" />
            ))}

          {/* Espaciador */}
          <div className="grow" />

          {NavMenuRoles.includes(role) && <NavMenu />}
        </ul>
      </div>
    </header>
  );
};
