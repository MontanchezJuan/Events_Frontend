import { Loader } from "./Loader";

interface LoaderComponentProps {
  children: React.ReactNode;
  isLoading: boolean;
  sizeLoader?: number;
}

export const LoaderComponent = ({
  children,
  isLoading,
  sizeLoader,
}: LoaderComponentProps) => {
  return isLoading ? (
    <div className="flex min-h-full min-w-full items-center justify-center">
      <Loader size={sizeLoader || 100} />
    </div>
  ) : (
    children
  );
};
