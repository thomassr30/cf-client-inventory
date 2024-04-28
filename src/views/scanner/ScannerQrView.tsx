import { isValidUUID } from "@/utils/uuidValid";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const ScannerQrView = () => {
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const getDataScanner = (text: string, result: any) => {
    if (isValidUUID(text)) {
      navigate(`/seccion/${text}`);
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <div className="relative">
      <div
        className="absolute left-5 top-5 z-50"
        onClick={() => navigate("/auth/login")}
      >
        <FaArrowLeft className="text-3xl text-white" />
      </div>

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50">
        <h4 className=" text-white text-center">
          {showError ? "QR no válido" : ""}
        </h4>
      </div>
      <Scanner
        onResult={(text, result) => getDataScanner(text, result)}
        onError={(error) => console.log(error?.message)}
        styles={{
          container: {
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "black",
          },
        }}
      />
    </div>
  );
};
