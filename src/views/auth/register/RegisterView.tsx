import { AuthService } from "@/api/auth.service";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { formatRut } from "@/utils/formatRut";
import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

type FormField = "firstName" | "lastName";

export const RegisterView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  const handleChangeRut = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const formattedValue = formatRut(value);
    setValue("rut", formattedValue);
  };

  const handleChangeLetter = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: FormField
  ) => {
    let value = event.target.value;
    if (Object.keys(getValues()).includes(field as string)) {
      value = capitalizeFirstLetter(value);
      setValue(field, value);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const user = {
      name: data.firstName,
      lastName: data.lastName,
      email: String(data.email).trim().toLowerCase(),
      password: data.password,
      rut: data.rut,
      companyId: 1,
    };
    AuthService.register(user);
  });

  return (
    <div className="w-full px-8 md:px-32 lg:px-24">
      <form className="bg-white rounded-md shadow-2xl p-5" onSubmit={onSubmit}>
        <h1 className="text-gray-800 font-bold text-2xl mb-1">Registrarme!</h1>
        <span>
          {errors.firstName && (
            <span className="text-red-500 text-sm">
              {errors.firstName.message as React.ReactNode}
            </span>
          )}
        </span>
        <div
          className={`flex items-center border-2 mb-5 py-2 px-3 rounded-2xl ${
            errors.firstName ? "border-red-500" : "border-green-300"
          }`}>
          <input
            id="firstName"
            className=" pl-2 w-full outline-none border-none"
            type="text"
            placeholder="Nombres"
            autoComplete="off"
            {...register("firstName", {
              required: "El Nombre es requerido",
            })}
            onChange={(e) => handleChangeLetter(e, "firstName")}
          />
        </div>

        <span>
          {errors.lastName && (
            <span className="text-red-500 text-sm">
              {errors.lastName.message as React.ReactNode}
            </span>
          )}
        </span>
        <div
          className={`flex items-center border-2 mb-5 py-2 px-3 rounded-2xl ${
            errors.lastName ? "border-red-500" : "border-green-300"
          }`}>
          <input
            id="lastName"
            className=" pl-2 w-full outline-none border-none"
            type="text"
            placeholder="Apellido Paterno"
            autoComplete="off"
            {...register("lastName", {
              required: "El Apellido es requerido",
            })}
          />
        </div>

        <span>
          {errors.rut && (
            <span className="text-red-500 text-sm">
              {errors.rut.message as React.ReactNode}
            </span>
          )}
        </span>
        <div
          className={`flex items-center border-2 mb-5 py-2 px-3 rounded-2xl ${
            errors.rut ? "border-red-500" : "border-green-300"
          }`}>
          <input
            id="rut"
            className=" pl-2 w-full outline-none border-none"
            type="text"
            placeholder="Rut"
            autoComplete="off"
            {...register("rut", {
              required: "El Rut es requerido",
            })}
            onChange={handleChangeRut}
          />
        </div>

        <span>
          {errors.email && (
            <span className="text-red-500 text-sm">
              {errors.email.message as React.ReactNode}
            </span>
          )}
        </span>
        <div
          className={`flex items-center border-2 mb-5 py-2 px-3 rounded-2xl ${
            errors.email ? "border-red-500" : "border-green-300"
          }`}>
          <input
            id="email"
            className=" pl-2 w-full outline-none border-none"
            type="email"
            placeholder="Correo Electronico"
            autoComplete="off"
            {...register("email", {
              required: "El correo es requerido",
            })}
          />
        </div>

        <span>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message as React.ReactNode}
            </span>
          )}
        </span>
        <div
          className={`flex items-center border-2 mb-5 py-2 px-3 rounded-2xl ${
            errors.password ? "border-red-500" : "border-green-300"
          }`}>
          <input
            className="pl-2 w-full outline-none border-none"
            type="password"
            id="password"
            placeholder="Contraseña"
            autoComplete="off"
            {...register("password", {
              required: "La contraseña es requerida",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
        </div>

        <span>
          {errors.passwordRepeat && (
            <span className="text-red-500 text-sm">
              {errors.passwordRepeat.message as React.ReactNode}
            </span>
          )}
        </span>
        <div
          className={`flex items-center border-2 mb-5 py-2 px-3 rounded-2xl ${
            errors.passwordRepeat ? "border-red-500" : "border-green-300"
          }`}>
          <input
            className="pl-2 w-full outline-none border-none"
            type="password"
            id="passwordRepeat"
            placeholder="Repetir Contraseña"
            autoComplete="off"
            {...register("passwordRepeat", {
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
              validate: (value) =>
                value === getValues("password") ||
                "Las contraseñas no coinciden",
            })}
          />
        </div>
        <button
          type="submit"
          className="block w-full bg-green-400 text-white mt-5 py-2 rounded-2xl hover:bg-green-300 hover:text-white font-semibold mb-2">
          Registrarme
        </button>
        <div className="flex justify-center mt-4">
          <NavLink
            to="/auth/login"
            className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
            ¿Ya tienes una cuenta?
          </NavLink>
        </div>
      </form>
    </div>
  );
};
