import { UnderlineText } from "../../components/atoms/common/UnderlineText";
import { SignupForm } from "../../components/molecules/forms/SignupForm";
import MainLayout from "../../components/templates/MainLayout";

const SingupPage = () => {
  return (
    <MainLayout>
      <main className="flex min-h-[calc(100vh_-_60px)] w-full flex-col items-center justify-center gap-4">
        <UnderlineText text="Regístrate" color="after:bg-white" size="2xl" />
        <UnderlineText
          text="fácil y rápido"
          color="after:bg-white"
          size="2xl"
        />

        <SignupForm />
      </main>
    </MainLayout>
  );
};

export default SingupPage;
