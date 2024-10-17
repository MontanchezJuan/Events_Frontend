import { UnderlineText } from "../../components/atoms/common/UnderlineText";
import { ForgotPasswordForm } from "../../components/molecules/forms/ForgotPasswordForm";
import { RestorePasswordForm } from "../../components/molecules/forms/RestorePasswordForm";

const RecoverPassPage = () => {
  return (
    <main className="flex min-h-[calc(100vh_-_60px)] w-full flex-col items-center justify-center gap-4">
      <UnderlineText color="after:bg-white" size="2xl">
       Restaurar<br />Contraseña
      </UnderlineText>

      <RestorePasswordForm />
    </main>
  );
};

export default RecoverPassPage;
