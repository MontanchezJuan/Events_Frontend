import { Loader } from "./Loader";

interface LoaderComponentProps {
  children: React.ReactNode;
  isLoading: boolean;
}

export const LoaderComponent = ({
  children,
  isLoading,
}: LoaderComponentProps) => {
  return isLoading ? <Loader size={40} /> : children;
};
