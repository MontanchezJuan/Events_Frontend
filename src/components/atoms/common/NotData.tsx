interface NotDataProps {
  children?: React.ReactNode;
}

export const NotData = ({ children }: NotDataProps) => {
  return (
    <div className="flex flex-col items-center bg-[#00ff66]">
      <p className="my-4 text-center text-3xl font-semibold">
        Actualmente no hay información para mostrar
      </p>
      {children}
    </div>
  );
};
