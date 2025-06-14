import { Product } from "@/interfaces/Product";
import { ProductFilters, ProductServices } from "@/services/ProductServices";
import { create } from "zustand";

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    filters: ProductFilters;
    fetchProducts: (filters: ProductFilters) => Promise<void>;
    setFilters: (filters: Partial<ProductFilters>) => void;
}
export const useProductStore = create<ProductState>((set,get) => ({
    products: [],
    loading: false,
    error: null,
    filters: {
        PageNumber: 1,
        PageSize: 10,
    },
    fetchProducts: async (filters: ProductFilters) => {
        set({ loading: true, error: null });
        try {
            const {filters} = get();
            const data = await ProductServices.fetchProducts(filters); 
            console.log("Productos obtenidos:", data);
            set({ products: data, loading: false});
        } catch (error) {
            set({ loading: false, error: error instanceof Error ? error.message : "Error al obtenerr los productos" });
        }
    },
    setFilters: (newFilters) => 
        set((state) => ({
            filters: { ...state.filters, ...newFilters },
        })),
}));