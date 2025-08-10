import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Recipe } from "@/types/types";
import { useToast } from "@/components/ui/use-toast";

export const useRecipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchRecipes = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("recipes")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                throw error;
            }

            setRecipes(data || []);
        } catch (error) {
            console.error("Error fetching recipes:", error);
            toast({
                title: "Error",
                description: "Failed to load recipes",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const addRecipe = async (
        recipe: Omit<
            Recipe,
            | "id"
            | "created_at"
            | "updated_at"
            | "generated_from_discounts"
            | "discount_products_used"
        >,
    ) => {
        try {
            const { data, error } = await supabase
                .from("recipes")
                .insert([recipe])
                .select("*")
                .single();

            if (error) throw error;

            setRecipes((prev) => [data, ...prev]);
            toast({
                title: "Success",
                description: "Recipe added successfully!",
            });

            return data;
        } catch (error) {
            console.error("Error adding recipe:", error);
            toast({
                title: "Error",
                description: "Failed to add recipe",
                variant: "destructive",
            });
            throw error;
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return {
        recipes,
        loading,
        refetch: fetchRecipes,
        addRecipe,
    };
};
