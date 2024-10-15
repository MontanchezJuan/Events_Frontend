import { LogoButton } from "../atoms/templates/LogoButton";
import { Menu } from "../molecules/templates/Menu";

export const Header = () => {
  return (
    <header className="flex h-[60px] items-center justify-center bg-zinc-900 px-4">
      <div className="w-full max-w-[1128px]">
        <ul className="flex flex-wrap items-center gap-4 py-4 sm:gap-6">
          <LogoButton />

          {/* Espaciador */}
          <div className="grow" />

          <Menu />
        </ul>
      </div>
    </header>
  );
};
