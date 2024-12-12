import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { MdOutlineSearch } from "react-icons/md";
import * as yup from "yup";
import { Event } from "../../../api/interfaces/event";
import { list_events } from "../../../api/services/eventsService";
import { FormField } from "../../../interfaces/Form.interfaces";
import { ErrorText } from "../../atoms/common/ErrorText";
import { Input } from "../../atoms/common/Input";
import { Form } from "../../templates/Form";

const schema = yup
  .object({
    name: yup.string(),
    categories: yup.string(),
    site: yup.string(),
    time: yup.string(),
    date: yup.string(),
  })
  .required();
export type LoginFormData = yup.InferType<typeof schema>;

interface EventsFilterFormProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

export const EventsFilterForm = ({
  setIsLoading,
  setEvents,
}: EventsFilterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const parseDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${year}-${month}-${Number(day) + 1}`;
  };

  const onSubmit = async (data: LoginFormData) =>
    setEvents(
      await list_events({
        params: {
          ...data,
          date: data.date
            ? new Date(parseDate(data.date)).toLocaleDateString()
            : "",
          is_active: true,
        },
        setState: setIsLoading,
      }),
    );

  const formFields: FormField[] = [
    {
      placeholder: "Buscar nombre del evento",
      name: "name",
      type: "text",
      error: errors.name?.message,
    },
    {
      placeholder: "Buscar categoría del evento",
      name: "categories",
      type: "text",
      error: errors.categories?.message,
    },
    {
      placeholder: "Buscar lugar del evento",
      name: "site",
      type: "text",
      error: errors.site?.message,
    },
    {
      placeholder: "Fecha del evento",
      name: "date",
      type: "date",
      error: errors.date?.message,
    },
    {
      placeholder: "Fecha del evento",
      name: "time",
      type: "time",
      error: errors.time?.message,
    },
  ];

  return (
    <Form
      className="justify-between md:flex-row"
      onSubmit={handleSubmit(onSubmit)}
    >
      {formFields.map((field) => (
        <div key={field.name}>
          <Input
            className={`${field.name === "date" && "w-[160px]"} ${field.name === "time" && "w-[100px]"}`}
            placeholder={field.placeholder}
            type={field.type}
            error={field.error}
            {...register(field.name as keyof LoginFormData)}
          />
          {field.error && <ErrorText>{field.error}</ErrorText>}
        </div>
      ))}

      <button
        className="gap-2 rounded-xl bg-[#00ff66] px-4 py-2 text-base text-zinc-800 transition-colors duration-700 hover:bg-[#00B340]"
        type="submit"
      >
        <MdOutlineSearch className="text-[24px]" />
      </button>
    </Form>
  );
};
