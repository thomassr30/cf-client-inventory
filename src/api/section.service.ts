import api from "@/lib/axios";
import { ISection } from "interfaces/section.interface";

export class SectionService{

    static sections = async (): Promise<any> => {
        try {
            const {data} = await api.get<ISection>(`/section`);
            return data;
        } catch (error) {
            throw new Error("Error al obtener sections");
        }
    }

    static createSection = async (section: ISection): Promise<any> => {
        try {
            const {data} = await api.post<ISection>(`/section`, section);
            return data;
        } catch (error) {
            throw new Error("Error al crear section");
        }
    }

    static updateSection = async (id: string,section: ISection): Promise<any> => {
        try {
            const {data} = await api.patch<ISection>(`/section/${id}`, section);
            return data;
        } catch (error) {
            throw new Error("Error al actualizar section");
        }
    }

}