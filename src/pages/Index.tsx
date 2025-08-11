import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DiscountProduct } from "@/components/DiscountProduct";
import { RecipeCard } from "@/components/RecipeCard";
import { FilterBar } from "@/components/FilterBar";
import { useDiscountProducts } from "@/hooks/useDiscountProducts";
import { useRecipes } from "@/hooks/useRecipes";
import { FilterState, DiscountedProduct, Recipe } from "@/types/types";
import {
    ShoppingCart,
    ChefHat,
    Sparkles,
    RefreshCw,
    Loader2,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
    const { toast } = useToast();
    const [filters, setFilters] = useState<FilterState>({
        stores: [],
        categories: [],
        searchTerm: "",
        minDiscount: 0,
        maxPrice: 1000,
    });

    const [selectedProducts, setSelectedProducts] = useState<
        DiscountedProduct[]
    >([]);
    const [activeTab, setActiveTab] = useState("products");

    const [isGenerating, setIsGenerating] = useState(false);

    const {
        products,
        loading: productsLoading,
        categories,
        refetch: refetchProducts,
    } = useDiscountProducts(filters);
    const { loading: recipesLoading, addRecipe } = useRecipes();

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const filteredProducts = products.filter((product) => {
        // Filter by search term
        const matchesSearchTerm =
            filters.searchTerm === "" ||
            product.product_name
                .toLowerCase()
                .includes(filters.searchTerm.toLowerCase());

        // Filter by selected stores
        const matchesStore =
            filters.stores.length === 0 ||
            filters.stores.includes(product.store_name);

        // Filter by selected categories
        if (!product.category) {
            throw new Error("Product category not found.");
        }
        const matchesCategory =
            filters.categories.length === 0 ||
            filters.categories.includes(product.category);

        // Filter by minimum discount
        const meetsMinDiscount = product.percentage_off >= filters.minDiscount;

        // Filter by maximum price
        const meetsMaxPrice = product.discounted_price <= filters.maxPrice;

        // Return true only if all conditions are met
        return (
            matchesSearchTerm &&
            matchesStore &&
            matchesCategory &&
            meetsMinDiscount &&
            meetsMaxPrice
        );
    });

    const handleAddToRecipe = (product: DiscountedProduct) => {
        if (!selectedProducts.find((p) => p.id === product.id)) {
            setSelectedProducts((prev) => [...prev, product]);
            toast({
                title: "Product Added",
                description: `${product.product_name} added to recipe ingredients`,
            });
        } else {
            toast({
                title: "Already Added",
                description:
                    "This product is already in your recipe ingredients",
                variant: "destructive",
            });
        }
    };

    const removeFromSelected = (productId: string) => {
        setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
    };

    const createPrompt = (ingredients: string[]): string => {
        return `
    You are a creative culinary assistant. Your task is to generate 2 compelling recipes based on a list of key ingredients.


    The key ingredients, which are on sale, are: ${ingredients.join(", ")}.


    Please adhere to the following rules:
    1.  The recipe should use most of the key ingredients provided.
    2.  You can assume common pantry staples are available (e.g., oil, salt, pepper, water, basic spices).
    3.  Your entire response MUST be a list of valid, minified JSON objects. Each JSON object MUST correspond to each recipe. Do not include any text, explanations, or markdown formatting like \`\`\`json before or after the JSON object.
    4.  Each JSON object must strictly follow this TypeScript interface:
        \`\`\`typescript
        {
          title: string;
          description: string;
          ingredients: Array<{
            name: string;
            amount: string;
            unit: string;
            isDiscounted: boolean;
          }>;
          cooking_steps: string[];
          calories: number;
          prep_time_minutes: number;
          cook_time_minutes: number;
          servings: number;
          difficulty_level: 'Easy' | 'Medium' | 'Hard';
          cuisine_type: string;
        }
        \`\`\`
    5.  For each item in the 'ingredients' array:
        - Set 'isDiscounted' to true if it is one of the key ingredients.
        - List all other necessary ingredients (including pantry staples) and set their 'isDiscounted' property to false.
  `;
    };

    const generateRecipes = async () => {
        if (selectedProducts.length < 2) {
            // Encourage selecting more than one item
            toast({
                title: "Not Enough Ingredients",
                description:
                    "Please select at least 2 discount products for a better recipe.",
                variant: "destructive",
            });
            return;
        }

        setIsGenerating(true);
        try {
            setRecipes([]);
            const ingredientNames = selectedProducts.map((p) => p.product_name);
            const discountProductIds = selectedProducts.map((p) => p.id);

            const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

            const response = await fetch(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model: "nousresearch/nous-hermes-2-mixtral-8x7b-dpo",
                        messages: [
                            {
                                role: "user",
                                content: createPrompt(ingredientNames),
                            },
                        ],
                        response_format: { type: "json_object" },
                    }),
                },
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message || "Failed to generate recipe",
                );
            }

            const data = await response.json();

            const newRecipeDataArray = JSON.parse(
                data.choices[0].message.content,
            );

            newRecipeDataArray.forEach((recipeData: any) => {
                const newRecipeData = recipeData;
                const newRecipe: Recipe = {
                    id: crypto.randomUUID(),
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    generated_from_discounts: true,
                    discount_products_used: ingredientNames,
                    ...newRecipeData,
                };

                setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
            });

            toast({
                title: "✨ Recipe Generated!",
                description: `Your new recipes are ready. Enjoy cooking!`,
            });

            // Switch to the recipes tab to show the result
            setActiveTab("recipes");
            // Optional: Clear selected products after generating a recipe
            setSelectedProducts([]);
        } catch (error) {
            console.log(error);
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred.";
            toast({
                title: "Generation Failed",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const totalSavings = selectedProducts.reduce(
        (sum, product) =>
            sum + (product.original_price - product.discounted_price),
        0,
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-card">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
                                <ShoppingCart className="h-8 w-8" />
                                Meal Deals
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Find discounted groceries and create delicious
                                recipes
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Badge
                                variant="outline"
                                className="bg-savings/10 text-savings border-savings"
                            >
                                {products.length} Products on Sale
                            </Badge>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={refetchProducts}
                            >
                                <RefreshCw className="h-4 w-4 mr-1" />
                                Refresh
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger
                            value="products"
                            className="flex items-center gap-2"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            On Sale Products
                        </TabsTrigger>
                        <TabsTrigger
                            value="recipes"
                            className="flex items-center gap-2"
                        >
                            <ChefHat className="h-4 w-4" />
                            Recipes
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="products" className="space-y-6">
                        {/* Selected Products Summary */}
                        {selectedProducts.length > 0 && (
                            <Card className="bg-primary/5 border-primary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <Sparkles className="h-5 w-5" />
                                            Recipe Ingredients (
                                            {selectedProducts.length})
                                        </span>
                                        <div className="flex items-center gap-4">
                                            <Badge className="bg-savings text-white">
                                                Save ${totalSavings.toFixed(2)}
                                            </Badge>
                                            <Button
                                                onClick={generateRecipes}
                                                disabled={isGenerating}
                                            >
                                                {isGenerating ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Generating...
                                                    </>
                                                ) : (
                                                    <>
                                                        <ChefHat className="mr-2 h-4 w-4" />
                                                        Generate Recipe
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProducts.map((product) => (
                                            <Badge
                                                key={product.id}
                                                variant="secondary"
                                                className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                                                onClick={() =>
                                                    removeFromSelected(
                                                        product.id,
                                                    )
                                                }
                                            >
                                                {product.product_name} - $
                                                {product.discounted_price.toFixed(
                                                    2,
                                                )}
                                                <span className="ml-1">×</span>
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Filters */}
                        <FilterBar
                            filters={filters}
                            onFiltersChange={setFilters}
                            categories={categories}
                        />

                        {/* Products Grid */}
                        {productsLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {[...Array(8)].map((_, i) => (
                                    <Card key={i} className="animate-pulse">
                                        <CardContent className="p-4">
                                            <div className="h-20 bg-muted rounded mb-3"></div>
                                            <div className="h-4 bg-muted rounded mb-2"></div>
                                            <div className="h-3 bg-muted rounded w-2/3"></div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">
                                        No Products Found
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Try adjusting your filters or check back
                                        later for new deals
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredProducts.map((product) => (
                                    <DiscountProduct
                                        key={product.id}
                                        product={product}
                                        onAddToRecipe={handleAddToRecipe}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="recipes" className="space-y-6">
                        {recipesLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <Card key={i} className="animate-pulse">
                                        <CardHeader>
                                            <div className="h-6 bg-muted rounded mb-2"></div>
                                            <div className="h-4 bg-muted rounded w-3/4"></div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <div className="h-3 bg-muted rounded"></div>
                                                <div className="h-3 bg-muted rounded w-5/6"></div>
                                                <div className="h-3 bg-muted rounded w-4/6"></div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : recipes.length === 0 ? (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <ChefHat className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">
                                        No Recipes Yet
                                    </h3>
                                    <p className="text-muted-foreground mb-4">
                                        Start by selecting some discount
                                        products and generate your first recipe!
                                    </p>
                                    <Button
                                        onClick={() => setActiveTab("products")}
                                    >
                                        Browse Products
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {recipes.map((recipe) => (
                                    <RecipeCard
                                        key={recipe.id}
                                        recipe={recipe}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Index;
