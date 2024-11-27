import { useState } from "react";
import { Inscription } from "../../../api/interfaces/inscription";
import { Form } from "../../templates/Form";

interface InscriptionFormProps {
  initialValues?: Inscription | null;
}

export const InscriptionForm = ({ initialValues }: InscriptionFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //   const {
  //     control,
  //     register,
  //     handleSubmit,
  //     getValues,
  //     setValue,
  //     formState: { errors },
  //   } = useForm<EventFormData>({
  //     resolver: yupResolver(schema),
  //   });

  return <Form>InscriptionForm</Form>;
};
