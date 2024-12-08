import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { MdAdd, MdClear, MdCreate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Event } from "../../../api/interfaces/event";
import {
  create_event,
  update_event,
} from "../../../api/services/eventsService";
import { FormField } from "../../../interfaces/Form.interfaces";
import { ADMINROUTES } from "../../../routes/Admin.routes";
import useStore from "../../../store/useStore";
import { Alert } from "../../../utils/swal";
import { PrimaryButton } from "../../atoms/common/Button";
import { ErrorText } from "../../atoms/common/ErrorText";
import { Input } from "../../atoms/common/Input";
import { LoaderComponent } from "../../atoms/common/LoaderComponent";
import { TextArea } from "../../atoms/common/TextArea";
import { Form } from "../../templates/Form";
import { EventFormData, EventFormSchema } from "./schemas/EventForm.schema";

interface EventFormProps {
  initialValues?: Event | null;
}

export const EventForm = ({ initialValues }: EventFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputCategory, setInputCategory] = useState<string>("");
  const [inputRestriction, setInputRestriction] = useState<string>("");

  const navigate = useNavigate();

  const parseDate = (dateString: string): string => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: yupResolver(EventFormSchema),
    defaultValues: initialValues
      ? { ...initialValues, date: parseDate(initialValues.date) }
      : {},
  });

  const addCategory = () => {
    if (inputCategory) {
      setValue(
        "categories",
        categories ? [...categories, inputCategory] : [inputCategory],
        { shouldValidate: true },
      );
      setInputCategory("");
    }
  };

  const deleteCategory = (index: number) => {
    if (categories) {
      const newCategories = categories.filter((_, idx) => idx !== index);
      setValue("categories", newCategories, { shouldValidate: true });
    }
  };

  const addRestriction = () => {
    if (inputRestriction) {
      setValue(
        "restrictions",
        restrictions ? [...restrictions, inputRestriction] : [inputRestriction],
        { shouldValidate: true },
      );
      setInputRestriction("");
    }
  };

  const deleteRestriction = (index: number) => {
    if (restrictions) {
      const newRestrictions = restrictions.filter((_, idx) => idx !== index);
      setValue("restrictions", newRestrictions, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: EventFormData) => {
    if (initialValues) {
      const ok = await update_event({
        id: initialValues._id,
        newData: {
          ...data,
          date: new Date(data.date).toLocaleDateString(),
          organizer_id: initialValues.organizer_id,
          image: data.image
            ? data.image
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Logo_de_la_Universidad_de_Caldas.svg/2044px-Logo_de_la_Universidad_de_Caldas.svg.png",
        },
        setState: setIsLoading,
      });
      if (ok) {
        Alert({
          text: "Evento actualizado correctamente",
          icon: "success",
          title: "Ok",
        }).then(() => {
          navigate(ADMINROUTES.EVENTS);
        });
      }
    } else {
      const newData = {
        ...data,
        date: new Date(data.date).toLocaleDateString(),
        organizer_id: useStore.getState().user.id,
        image: data.image
          ? data.image
          : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Logo_de_la_Universidad_de_Caldas.svg/2044px-Logo_de_la_Universidad_de_Caldas.svg.png",
      };

      const ok = await create_event({
        newData,
        setState: setIsLoading,
      });
      if (ok) {
        Alert({
          text: "Evento creado correctamente",
          icon: "success",
          title: "Ok",
        }).then(() => {
          navigate(ADMINROUTES.EVENTS);
        });
      }
    }
  };

  const image = useWatch({
    control,
    name: "image",
  });

  const categories = useWatch({
    control,
    name: "categories",
  });

  const restrictions = useWatch({
    control,
    name: "restrictions",
  });

  const formFields: FormField[] = [
    {
      placeholder: "Nombre del evento",
      name: "name",
      type: "text",
      error: errors.name?.message,
    },
    {
      placeholder: "Lugar",
      name: "site",
      type: "text",
      error: errors.site?.message,
    },
    {
      placeholder: "Entidad",
      name: "entity",
      type: "text",
      error: errors.entity?.message,
    },
    {
      placeholder: "Imagen del banner",
      name: "image",
      type: "text",
      error: errors.image?.message,
    },
    {
      placeholder: "Fecha",
      name: "date",
      type: "date",
      error: errors.date?.message,
    },
    {
      placeholder: "Hora",
      name: "time",
      type: "time",
      error: errors.time?.message,
    },
  ];

  return (
    <div className="flex min-w-full flex-col gap-12 md:flex-row">
      {image ? (
        <img
          className="w-full md:w-1/2"
          src={getValues("image")}
          alt={getValues("image")}
        />
      ) : (
        <img
          className="w-full md:w-1/2"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Logo_de_la_Universidad_de_Caldas.svg/2044px-Logo_de_la_Universidad_de_Caldas.svg.png"
          alt="default image"
        />
      )}

      <Form className="w-full md:w-1/2" onSubmit={handleSubmit(onSubmit)}>
        {formFields.map((field) => (
          <div key={field.name} className="min-w-full">
            <Input
              className="min-w-full"
              placeholder={field.placeholder}
              type={field.type}
              error={field.error}
              {...register(field.name as keyof EventFormData)}
            />
            {field.error && <ErrorText>{field.error}</ErrorText>}
          </div>
        ))}

        <div className="min-w-full">
          <TextArea
            className="w-full"
            placeholder="Descripción"
            error={errors.description?.message}
            {...register("description")}
          />
          {errors.description?.message && (
            <ErrorText>{errors.description?.message}</ErrorText>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 md:flex-row">
            <Input
              value={inputCategory}
              onChange={(e) => setInputCategory(e.target.value)}
              error={errors.categories?.message}
              placeholder="Categoría"
            />
            <PrimaryButton type="button" onClick={addCategory}>
              <MdAdd /> categoría
            </PrimaryButton>
          </div>

          {errors.categories?.message && (
            <ErrorText>{errors.categories?.message}</ErrorText>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {categories &&
              categories.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 whitespace-nowrap rounded-3xl bg-[#00ff66] px-2 py-1 font-bold text-black"
                >
                  {category}{" "}
                  <MdClear
                    className="cursor-pointer"
                    onClick={() => deleteCategory(index)}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 md:flex-row">
            <Input
              value={inputRestriction}
              onChange={(e) => setInputRestriction(e.target.value)}
              placeholder="Restricción"
            />
            <PrimaryButton type="button" onClick={addRestriction}>
              <MdAdd /> restricción
            </PrimaryButton>
          </div>

          {errors.restrictions?.message && (
            <ErrorText>{errors.restrictions?.message}</ErrorText>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {restrictions &&
              restrictions.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 whitespace-nowrap rounded-3xl bg-[#FF9F00] px-2 py-1 font-bold text-black"
                >
                  {category}{" "}
                  <MdClear
                    className="cursor-pointer"
                    onClick={() => deleteRestriction(index)}
                  />
                </div>
              ))}
          </div>
        </div>

        <PrimaryButton disabled={isLoading} type="submit" forForm>
          <LoaderComponent isLoading={isLoading}>
            {initialValues ? (
              <>
                <MdCreate /> Editar evento
              </>
            ) : (
              <>
                <MdAdd /> Crear evento
              </>
            )}
          </LoaderComponent>
        </PrimaryButton>
      </Form>
    </div>
  );
};
