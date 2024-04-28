import api from "@/lib/axios";
import { ILocation } from "interfaces/location.interface";

export class LocationService{
    static locations = async (): Promise<any> => {
        try {
            const {data} = await api.get<ILocation>(`/location`);
            return data;
        } catch (error) {
            throw new Error("Error al obtener locations");
        }
    }

    static createLocation = async (location: ILocation): Promise<any> => {
        try {
            const {data} = await api.post<ILocation>(`/location`, location);
            console.log(data)
            return data;
        } catch (error) {
            throw new Error("Error al crear location");
        }
    }

    static updateLocation = async (location: ILocation): Promise<any> => {
        try {
            const {data} = await api.patch<ILocation>(`/location/${location.id}`, location);
            return data;
        } catch (error) {
            throw new Error("Error al actualizar location");
        }
    }
}