import { Outlet } from "react-router-dom";
import { Header } from "../organisms/Header";

const MainLayout = () => {
  return (
    <>
      <Header />

      <div className="flex justify-center">
        <section className="w-full md:w-[720px] lg:w-[1200px]">
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default MainLayout;
