import { UnderlineText } from "../../components/atoms/common/UnderlineText";
import { ForgotPasswordForm } from "../../components/molecules/forms/ForgotPasswordForm";

const RecoverPassPage = () => {
  return (
    <main className="flex min-h-[calc(100vh_-_60px)] w-full flex-col items-center justify-center gap-4">
      <UnderlineText text="Recuperar" color="after:bg-white" size="2xl"></UnderlineText>
      <UnderlineText text="contraseña" color="after:bg-white" size="2xl"></UnderlineText>

      <ForgotPasswordForm />
    </main>
  );
};

export default RecoverPassPage;
