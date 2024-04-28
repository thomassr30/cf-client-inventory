import { FaSpinner } from "react-icons/fa";
import "./loading.css";

export const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <FaSpinner className="loader animate-spin" />
      <h2 className="animate-pulse">Cargando</h2>
    </div>
  );
};
