import { useGetItems } from "@/hooks/useGetItems";
import { NavLink, useParams } from "react-router-dom";
import { MdChecklist, MdHomeFilled } from "react-icons/md";
import { BiQrScan } from "react-icons/bi";
import { Loading } from "@/shared/components/loading/Loading";

export const ScannerListView = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetItems(id ?? "");

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <nav className="flex px-10 justify-between bg-sky-900 py-3">
        <NavLink to="/auth/login">
          <MdHomeFilled className="text-3xl text-white" />
        </NavLink>
        <NavLink to="/lector-qr">
          <BiQrScan className="text-3xl text-white" />
        </NavLink>
      </nav>

      <div className="w-full px-5">
        <h1 className="text-center text-3xl mt-3">{data?.section}</h1>

        <div className="border-b-2 border-gray-200 mt-4" />

        {Array.isArray(data?.items) && data.length !== 0 && (
          <div className="flex flex-col mt-10">
            {data?.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-l-2 border-green-400 mb-5 p-3 rounded-tr-xl rounded-br-xl bg-white"
              >
                <div>
                  <h3 className="text-lg">{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">{item.quantity}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {Array.isArray(data) && data.length === 0 && (
          <div className="flex flex-col gap-3 justify-center items-center mt-10">
            <MdChecklist className="text-7xl text-gray-500" />
            <h1 className="my-3 text-xl text-gray-500">
              No se encontraron datos
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};
