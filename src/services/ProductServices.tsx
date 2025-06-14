import { ApiBackend } from "@/clients/axios";
import { Product } from "@/interfaces/Product";
import { ResponseAPI } from "@/interfaces/ResponseAPI";

export interface ProductFilters{
    PageNumber: number;
    PageSize: number;
}

 
export const ProductServices = {
    async fetchProducts(filters: ProductFilters){
        const {data} = await ApiBackend.get<ResponseAPI>("Product", {
            params: filters
        });

        if(!data.success){
            throw new Error(data.message || "Error al obtener los productos");
        }
        if(!data.data || !Array.isArray(data.data)){
            throw new Error("No se encontraron productos");
        }
        if(data.errors){
            console.error("Errores en la respuesta del servidor:", data.errors);
        }
        return data.data as Product[];
    }
}