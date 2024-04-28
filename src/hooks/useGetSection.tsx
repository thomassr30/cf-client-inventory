import { SectionService } from "@/api/section.service";
import { useQuery } from "@tanstack/react-query";

export const useGetSection = () => {
  const query = useQuery({
    queryKey: ["section"],
    queryFn: async () => {
      const section = await SectionService.sections();
      return section;
    },
  });

  return query;
};
