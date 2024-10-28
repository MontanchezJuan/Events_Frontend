import { Header } from "../organisms/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />

      <div className="flex justify-center">
        <section className="w-full md:w-[720px] lg:w-[1200px]">
          {children}
        </section>
      </div>
    </>
  );
};

export default MainLayout;
