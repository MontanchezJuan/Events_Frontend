import { UnderlineText } from "../../components/atoms/common/UnderlineText";
import { RestorePasswordForm } from "../../components/molecules/forms/RestorePasswordForm";

const RecoverPassPage = () => {
  return (
    <main className="flex min-h-[calc(100vh_-_60px)] w-full flex-col items-center justify-center gap-4">
      <UnderlineText text="Restaurar" color="after:bg-white" size="2xl">
 </UnderlineText>
 <UnderlineText text="Contraseña" color="after:bg-white" size="2xl">
 </UnderlineText>

      <RestorePasswordForm />
    </main>
  );
};

export default RecoverPassPage;
