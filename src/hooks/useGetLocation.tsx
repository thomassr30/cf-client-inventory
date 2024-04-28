import { LocationService } from "@/api/location.service"
import { useQuery } from "@tanstack/react-query"

export const useGetLocation = () => {
    const query = useQuery({
    queryKey: ['location'],
    queryFn: async () => {
      const location = await LocationService.locations()
      return location
    }
  })

  return query;
}