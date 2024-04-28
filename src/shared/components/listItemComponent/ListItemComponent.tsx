import { useGetItems } from "@/hooks/useGetItems";
import { Loading } from "../loading/Loading";
import { MdChecklist } from "react-icons/md";

interface Props {
  locationId: string;
}

export const ListItemComponent = ({ locationId }: Props) => {
  const { data, isLoading } = useGetItems(locationId);

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white lg:w-[700px] w-3/4 p-5 rounded-xl">
        <Loading />
      </div>
    );
  }

  if (Array.isArray(data) && data.length === 0) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white lg:w-[700px] w-3/4 p-5 rounded-xl">
        <div className="flex flex-col gap-3 justify-center items-center">
          <MdChecklist className="text-7xl text-gray-500" />
          <h1 className="my-3 text-xl text-gray-500">
            No se encontraron datos
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white lg:w-[700px] w-3/4 p-5 rounded-xl">
      <h1 className="my-3 text-3xl text-center text-gray-500">
        {data?.section}
      </h1>
      <div className="scrollbar overflow-y-scroll h-96 scrollbar-thumb-green-400 scrollbar-track-green-100 p-2">
        {data?.items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-l-2 border-green-400 mb-5 p-3 rounded-tr-xl rounded-br-xl bg-white shadow-md"
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
    </div>
  );
};
