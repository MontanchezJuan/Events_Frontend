import { UnderlineText } from "../../components/atoms/common/UnderlineText";
import { LoginForm } from "../../components/molecules/forms/LoginForm";
import MainLayout from "../../components/templates/MainLayout";

const LoginPage = () => {
  return (
    <MainLayout>
      <main className="flex min-h-[calc(100vh_-_60px)] w-full flex-col items-center justify-center gap-4">
        <UnderlineText text="Es un placer" color="after:bg-white" size="2xl" />
        <UnderlineText
          text="volverte a ver"
          color="after:bg-white"
          size="2xl"
        />

        <LoginForm />
      </main>
    </MainLayout>
  );
};

export default LoginPage;
