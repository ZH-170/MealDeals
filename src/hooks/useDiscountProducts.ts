import { useState, useEffect } from "react";
import Papa from "papaparse";
import { DiscountedProduct, FilterState } from "@/types/types";
import { useToast } from "@/components/ui/use-toast";

// Store all products in memory to avoid re-fetching the file
let allProducts: DiscountedProduct[] = [];

export const useDiscountProducts = (filters: FilterState) => {
    const [products, setProducts] = useState<DiscountedProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<string[]>([]);
    const { toast } = useToast();

    // This function will fetch and parse the CSV data once
    const loadData = async () => {
        if (allProducts.length > 0) {
            // Data is already loaded
            return;
        }

        try {
            const response = await fetch('/discounted_products.csv');
            const csvText = await response.text();

            const parsedData = Papa.parse<DiscountedProduct>(csvText, {
                header: true,
                dynamicTyping: true, // Automatically converts numbers, booleans, etc.
                skipEmptyLines: true,
            });

            console.log(parsedData);

            if (parsedData.errors.length > 0) {
                console.error("Error parsing CSV:", parsedData.errors);
                throw new Error("CSV parsing error:", parsedData.errors);
            }

            allProducts = parsedData.data;

        } catch (error) {
            console.error("Failed to load or parse CSV file:", error);
            toast({
                title: "Error",
                description: "Failed to load product data from CSV file."+error,
                variant: "destructive",
            });
        }
    };

    const applyFiltersAndSort = () => {
        setLoading(true);

        // Start with all active products
        let filteredData = allProducts.filter(p => p.is_active === true);

        // Apply filters
        if (filters.stores.length > 0) {
            filteredData = filteredData.filter(product =>
                filters.stores.includes(product.store_name)
            );
        }

        if (filters.categories.length > 0) {
            filteredData = filteredData.filter(product =>{
                if (product.category) {
                    filters.categories.includes(product.category);
                }
            });
        }

        if (filters.searchTerm) {
            const searchTerm = filters.searchTerm.toLowerCase();
            filteredData = filteredData.filter(product =>
                product.product_name.toLowerCase().includes(searchTerm)
            );
        }

        if (filters.minDiscount > 0) {
            filteredData = filteredData.filter(product =>
                product.percentage_off >= filters.minDiscount
            );
        }

        if (filters.maxPrice < 1000) {
            filteredData = filteredData.filter(product =>
                product.discounted_price <= filters.maxPrice
            );
        }

        // Apply sorting
        filteredData.sort((a, b) => b.percentage_off - a.percentage_off);

        setProducts(allProducts);
        setLoading(false);
    };

    const extractCategories = () => {
        const activeProducts = allProducts.filter(p => p.is_active === true);
        const uniqueCategories = [
            ...new Set(activeProducts.map(item => item.category).filter(Boolean)),
        ] as string[];
        setCategories(uniqueCategories);
    };

    useEffect(() => {
        const initialize = async () => {
            setLoading(true);
            await loadData();
            // Once data is loaded, extract categories and apply initial filters
            extractCategories();
            applyFiltersAndSort();
        };

        if (allProducts.length === 0) {
            initialize();
        } else {
            // If data is already loaded, just apply new filters
            applyFiltersAndSort();
        }
    }, [filters]); // Re-run filtering when filters change

    const refetch = () => {
       // In this model, refetch simply re-applies the filters
       // to the in-memory data. You could enhance this to re-fetch the file if needed.
        applyFiltersAndSort();
    }

    return {
        products,
        loading,
        categories,
        refetch,
    };
};