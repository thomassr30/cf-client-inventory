import api from "@/lib/axios";
import { IGetItemBySection, IItem } from "interfaces/item.interface";

export class ItemService{
    static itemsBySection = async (sectionId: string): Promise<IGetItemBySection> => {
        try {
            const {data} = await api.get<IGetItemBySection>(`/item/section/${sectionId}`);
            return data;
        } catch (error) {
            throw new Error("Error al obtener items por sección");
        }
    }

    static allItems = async () => {
        try {
            const {data} = await api.get<IGetItemBySection>('/item');
            return data;
        } catch (error) {
            throw new Error("Error al obtener todos los items");
        }
    }

    static createItem = async (data: IItem) => {
        try {
            const response = await api.post('/item', data);
            return response;
        } catch (error) {
            throw new Error("Error al crear item");
        }
    }

    static updateItem = async (id: number, data: IItem) => {
        try {
            const response = await api.patch(`/item/${id}`, data);
            return response;
        } catch (error) {
            throw new Error("Error al actualizar item");
        }
    }

    static deleteItem = async (id: number) => {
        try {
            const response = await api.delete(`/item/${id}`);
            return response;
        } catch (error) {
            throw new Error("Error al eliminar item");
        }
    }

}