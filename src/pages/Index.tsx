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
import { ShoppingCart, ChefHat, Sparkles, RefreshCw, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState<FilterState>({
    stores: [],
    categories: [],
    searchTerm: '',
    minDiscount: 0,
    maxPrice: 1000,
  });

  const [selectedProducts, setSelectedProducts] = useState<DiscountedProduct[]>([]);
  const [activeTab, setActiveTab] = useState("products");
  
  const [isGenerating, setIsGenerating] = useState(false);

  const { loading: productsLoading, categories, refetch: refetchProducts } = useDiscountProducts(filters);
  const { recipes, loading: recipesLoading, addRecipe } = useRecipes();

  const products = [
  {
    id: '1a2b3c4d-0001-4000-8000-123456789abc',
    product_name: 'Organic Bananas',
    original_price: 4.50,
    discounted_price: 3.00,
    percentage_off: 33,
    store_name: 'Woolworths',
    category: 'Fruits',
    image_url: 'https://example.com/images/organic-banana.jpg',
    product_url: 'https://woolworths.com.au/shop/productdetails/organic-bananas',
    scraped_at: '2025-08-09T10:00:00Z',
    is_active: true,
    created_at: '2025-08-08T12:00:00Z',
    updated_at: '2025-08-09T09:00:00Z',
  },
  {
    id: '1a2b3c4d-0002-4000-8000-123456789abd',
    product_name: 'Whole Milk 2L',
    original_price: 3.20,
    discounted_price: 2.80,
    percentage_off: 13,
    store_name: 'Coles',
    category: 'Dairy',
    image_url: 'https://example.com/images/whole-milk-2l.jpg',
    product_url: 'https://coles.com.au/shop/productdetails/whole-milk-2l',
    scraped_at: '2025-08-09T10:05:00Z',
    is_active: true,
    created_at: '2025-08-08T13:30:00Z',
    updated_at: '2025-08-09T09:30:00Z',
  },
  {
    id: '1a2b3c4d-0003-4000-8000-123456789abe',
    product_name: 'Multigrain Bread',
    original_price: 2.50,
    discounted_price: 2.00,
    percentage_off: 20,
    store_name: 'Aldi',
    category: 'Bakery',
    image_url: 'https://example.com/images/multigrain-bread.jpg',
    product_url: 'https://aldi.com.au/shop/productdetails/multigrain-bread',
    scraped_at: '2025-08-09T09:45:00Z',
    is_active: true,
    created_at: '2025-08-08T11:00:00Z',
    updated_at: '2025-08-09T08:30:00Z',
  },
  {
    id: '1a2b3c4d-0004-4000-8000-123456789abf',
    product_name: 'Free Range Eggs 12 Pack',
    original_price: 5.50,
    discounted_price: 4.75,
    percentage_off: 14,
    store_name: 'IGA',
    category: 'Dairy',
    image_url: 'https://example.com/images/free-range-eggs.jpg',
    product_url: 'https://iga.com.au/shop/productdetails/free-range-eggs',
    scraped_at: '2025-08-09T09:15:00Z',
    is_active: false,
    created_at: '2025-08-07T15:00:00Z',
    updated_at: '2025-08-08T10:00:00Z',
  },
];

  const filteredProducts = products.filter(product => {
    // Filter by search term
    const matchesSearchTerm = filters.searchTerm === '' || 
      product.product_name.toLowerCase().includes(filters.searchTerm.toLowerCase());

    // Filter by selected stores
    const matchesStore = filters.stores.length === 0 || 
      filters.stores.includes(product.store_name);

    // Filter by selected categories
    const matchesCategory = filters.categories.length === 0 || 
      filters.categories.includes(product.category);

    // Filter by minimum discount
    const meetsMinDiscount = product.percentage_off >= filters.minDiscount;

    // Filter by maximum price
    const meetsMaxPrice = product.discounted_price <= filters.maxPrice;

    // Return true only if all conditions are met
    return matchesSearchTerm && matchesStore && matchesCategory && meetsMinDiscount && meetsMaxPrice;
  });

  const handleAddToRecipe = (product: DiscountedProduct) => {
    if (!selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts(prev => [...prev, product]);
      toast({
        title: "Product Added",
        description: `${product.product_name} added to recipe ingredients`,
      });
    } else {
      toast({
        title: "Already Added",
        description: "This product is already in your recipe ingredients",
        variant: "destructive",
      });
    }
  };

  const removeFromSelected = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const generateRecipes = async () => {
    if (selectedProducts.length === 0) {
      toast({
        title: "No Ingredients",
        description: "Please select some discount products first",
        variant: "destructive",
      });
      return;
    }

    // setIsGenerating(true);
    // try {
    //   const ingredientNames = selectedProducts.map(p => p.product_name);
      
    //   const response = await fetch('/api/generate-recipe', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ ingredients: ingredientNames }),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Failed to generate recipe');
    //   }

    //   const newRecipeData = await response.json();

    //   // Assuming your Recipe type has this structure.
    //   // We add a unique client-side ID.
    //   const newRecipe: Recipe = {
    //     id: crypto.randomUUID(), 
    //     ...newRecipeData
    //   };
      
    //   addRecipe(newRecipe);
      
    //   toast({
    //     title: "Recipe Generated!",
    //     description: `Your new recipe "${newRecipe.title}" has been created.`,
    //   });
      
    //   // Switch to the recipes tab to show the result
    //   setActiveTab("recipes");

    // } catch (error) {
    //   console.error(error);
    //   toast({
    //     title: "Error",
    //     description: "Could not generate a recipe. Please try again later.",
    //     variant: "destructive",
    //   });
    // } finally {
    //   setIsGenerating(false);
    // }
  };

  const totalSavings = selectedProducts.reduce((sum, product) => 
    sum + (product.original_price - product.discounted_price), 0
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
                Find discounted groceries and create delicious recipes
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-savings/10 text-savings border-savings">
                {products.length} Products on Sale
              </Badge>
              <Button variant="outline" size="sm" onClick={refetchProducts}>
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
            <TabsTrigger value="products" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              On Sale Products
            </TabsTrigger>
            <TabsTrigger value="recipes" className="flex items-center gap-2">
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
                      Recipe Ingredients ({selectedProducts.length})
                    </span>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-savings text-white">
                        Save ${totalSavings.toFixed(2)}
                      </Badge>
                      <Button onClick={generateRecipes} disabled={isGenerating}>
                        {/* {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          "Generate Recipes"
                        )} */}
                        Generate Recipes
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedProducts.map(product => (
                      <Badge 
                        key={product.id} 
                        variant="secondary" 
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeFromSelected(product.id)}
                      >
                        {product.product_name} - ${product.discounted_price.toFixed(2)}
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
                  <h3 className="text-lg font-semibold mb-2">No Products Found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or check back later for new deals
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
                  <h3 className="text-lg font-semibold mb-2">No Recipes Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start by selecting some discount products and generate your first recipe!
                  </p>
                  <Button onClick={() => setActiveTab("products")}>
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
