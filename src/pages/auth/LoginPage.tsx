import { UnderlineText } from "../../components/atoms/common/UnderlineText";
import { LoginForm } from "../../components/molecules/forms/LoginForm";

const LoginPage = () => {
  return (
    <main className="flex min-h-[calc(100vh_-_60px)] w-full flex-col items-center justify-center gap-4">
      <UnderlineText color="after:bg-white" size="2xl">
        Es un placer <br /> volverte a ver
      </UnderlineText>

      <LoginForm />
    </main>
  );
};

export default LoginPage;
