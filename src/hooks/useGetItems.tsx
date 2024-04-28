import { ItemService } from "@/api/item.service";
import { useQuery } from "@tanstack/react-query";
import { IGetItemBySection } from "interfaces/item.interface";

const getItemBySection = async (
  sectionId: string
): Promise<IGetItemBySection> => {
  const items = await ItemService.itemsBySection(sectionId);
  return items;
};

export const useGetItems = (id: string) => {
  const query = useQuery({
    queryKey: ["items"],
    queryFn: () => getItemBySection(id),
  });

  return query;
};

export const useAllItems = () => {
  const query = useQuery({
    queryKey: ["allItems"],
    queryFn: () => ItemService.allItems(),
  });

  return query;
};
