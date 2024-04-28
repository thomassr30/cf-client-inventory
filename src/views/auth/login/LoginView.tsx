import { useAuthStore } from "@/store/auth.store";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BsQrCode } from "react-icons/bs";

export const LoginView = () => {
  const loginUser = useAuthStore((state) => state.loginUser);
  const [error, seterror] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    seterror("");
    try {
      await loginUser(data.email, data.password);
      navigate("/dashboard/inicio");
    } catch (error) {
      console.log("No se pudo autenticar");
    }
  });

  return (
    <div className="w-full px-8 md:px-32 lg:px-24">
      <form className="bg-white rounded-md shadow-2xl p-5" onSubmit={onSubmit}>
        <h1 className="text-gray-800 font-bold text-2xl mb-1">
          Segunda Compañía
        </h1>
        <p className="text-sm font-normal text-gray-600 mb-4">Iniciar sesión</p>
        {error && (
          <div className="bg-red-200 mb-3 border-2 border-red-300 rounded-md">
            <h5 className="p-3 text-red-500 text-center">{error}</h5>
          </div>
        )}
        <div
          className={`flex items-center border-2 mb-8 py-2 px-3 rounded-2xl ${
            errors.email ? "border-red-500" : "border-green-300"
          }`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
          <input
            id="email"
            className="pl-2 w-full outline-none border-none"
            type="email"
            placeholder="Correo Electronico"
            {...register("email", {
              required: true,
              minLength: 3,
            })}
            autoComplete="off"
          />
        </div>
        <div
          className={`flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ${
            errors.password ? "border-red-500" : "border-green-300"
          }`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className="pl-2 w-full outline-none border-none"
            type="password"
            id="password"
            placeholder="Contraseña"
            {...register("password", {
              required: true,
            })}
          />
        </div>
        <button
          type="submit"
          className="block w-full bg-green-400 text-white mt-5 py-2 rounded-2xl hover:bg-green-300 hover:text-white font-semibold mb-2">
          Ingresar
        </button>
        <div className="flex items-center my-5">
          <div className="flex-1 h-0.5 bg-gray-400"></div>
          <span className="mx-2 text-gray-500 text-xl">o</span>
          <div className="flex-1 h-0.5 bg-gray-400"></div>
        </div>
        <div className="flex flex-col lg:flex-none items-center justify-center lg:justify-between mt-4">
          <NavLink
            to="/lector-qr"
            className="text-sm ml-2 mt-4 lg:mt-0">
            <BsQrCode className="text-7xl" />
          </NavLink>
        </div>
      </form>
    </div>
  );
};
