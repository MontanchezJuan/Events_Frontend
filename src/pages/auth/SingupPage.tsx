import { UnderlineText } from "../../components/atoms/common/UnderlineText";
import { SignupForm } from "../../components/molecules/forms/SignupForm";

const SingupPage = () => {
  return (
    <main className="flex min-h-[calc(100vh_-_60px)] w-full flex-col items-center justify-center gap-4">
      <UnderlineText color="after:bg-white" size="2xl">
        Regístrate <br /> fácil y rápido
      </UnderlineText>

      <SignupForm />
    </main>
  );
};

export default SingupPage;
