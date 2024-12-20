import { useEffect } from "react";
import useStore from "../../store/useStore";
import { Header } from "../organisms/Header";
import Sidebar from "../organisms/Sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const setScreenSize = useStore((store) => store.setScreenSize);
  const setIsSidebarOpen = useStore((store) => store.setIsSidebarOpen);
  const { isSidebarOpen } = useStore((store) => store.screen);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  return (
    <>
      <div className="relative flex">
        {isSidebarOpen ? (
          <div className="fixed z-50 h-screen bg-white w-72">
            <Sidebar />
          </div>
        ) : (
          <div className="fixed w-0 h-screen bg-white md:w-32">
            <Sidebar />
          </div>
        )}

        <div
          className={`min-h-screen w-full ${isSidebarOpen ? "md:pl-[288px]" : "md:pl-[128px]"}`}
        >
          <Header
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          <div
            className={`flex min-h-[calc(100vh_-_60px)] w-full justify-center py-8 pb-10`}
          >
            <section
              className={`w-full max-w-[1200px] rounded-lg bg-zinc-900 p-4`}
            >
              {children}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
