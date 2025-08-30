import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/types/types";
import { Clock, Users, Heart, ChefHat } from "lucide-react";
import { useState } from "react";

interface RecipeCardProps {
    recipe: Recipe;
    onToggleFavorite?: (recipeId: string) => void;
    isFavorite?: boolean;
}

const difficultyColors = {
    Easy: "bg-primary",
    Medium: "bg-accent",
    Hard: "bg-destructive",
};

export const RecipeCard = ({
    recipe,
    onToggleFavorite,
    isFavorite,
}: RecipeCardProps) => {
    const [showFullRecipe, setShowFullRecipe] = useState(false);

    const totalTime =
        (recipe.prep_time_minutes || 0) + (recipe.cook_time_minutes || 0);
    const discountedIngredients = recipe.ingredients.filter(
        (ing) => ing.isDiscounted,
    );

    return (
        <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg leading-tight">
                        {recipe.title}
                    </CardTitle>
                    {onToggleFavorite && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onToggleFavorite(recipe.id)}
                            className={
                                isFavorite
                                    ? "text-destructive"
                                    : "text-muted-foreground"
                            }
                        >
                            <Heart
                                className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
                            />
                        </Button>
                    )}
                </div>

                {recipe.description && (
                    <p className="text-sm text-muted-foreground">
                        {recipe.description}
                    </p>
                )}

                <div className="flex flex-wrap gap-2 mt-2">
                    {recipe.difficulty_level && (
                        <Badge
                            className={
                                difficultyColors[recipe.difficulty_level]
                            }
                        >
                            <ChefHat className="w-3 h-3 mr-1" />
                            {recipe.difficulty_level}
                        </Badge>
                    )}

                    {totalTime > 0 && (
                        <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            {totalTime}min
                        </Badge>
                    )}

                    <Badge variant="outline">
                        <Users className="w-3 h-3 mr-1" />
                        {recipe.servings} servings
                    </Badge>

                    {recipe.calories && (
                        <Badge variant="outline">{recipe.calories} cal</Badge>
                    )}

                    {recipe.cuisine_type && (
                        <Badge variant="secondary">{recipe.cuisine_type}</Badge>
                    )}
                </div>

                {discountedIngredients.length > 0 && (
                    <div className="mt-2">
                        <Badge className="bg-savings text-white">
                            {discountedIngredients.length} discounted
                            ingredients
                        </Badge>
                    </div>
                )}
            </CardHeader>

            <CardContent className="pt-0">
                <div className="space-y-3">
                    <div>
                        <h4 className="text-sm font-semibold mb-2">
                            Ingredients:
                        </h4>
                        <div className="space-y-1">
                            {recipe.ingredients
                                .slice(0, showFullRecipe ? undefined : 3)
                                .map((ingredient, index) => (
                                    <div
                                        key={index}
                                        className={`text-sm flex items-center gap-2 ${
                                            ingredient.isDiscounted
                                                ? "text-savings font-medium"
                                                : "text-muted-foreground"
                                        }`}
                                    >
                                        <span className="w-2 h-2 rounded-full bg-current opacity-50" />
                                        {ingredient.amount} {ingredient.unit}{" "}
                                        {ingredient.name}
                                        {ingredient.isDiscounted && (
                                            <Badge
                                                variant="outline"
                                                className="text-xs bg-savings/10 text-savings border-savings"
                                            >
                                                ON SALE
                                            </Badge>
                                        )}
                                    </div>
                                ))}
                            {!showFullRecipe &&
                                recipe.ingredients.length > 3 && (
                                    <div className="text-sm text-muted-foreground">
                                        +{recipe.ingredients.length - 3} more
                                        ingredients...
                                    </div>
                                )}
                        </div>
                    </div>

                    {showFullRecipe && (
                        <div>
                            <h4 className="text-sm font-semibold mb-2">
                                Instructions:
                            </h4>
                            <div className="space-y-2">
                                {recipe.cooking_steps.map((step, index) => (
                                    <div
                                        key={index}
                                        className="text-sm text-muted-foreground"
                                    >
                                        <span className="font-medium text-foreground">
                                            {index + 1}.
                                        </span>{" "}
                                        {step}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFullRecipe(!showFullRecipe)}
                        className="w-full bg-primary/5"
                    >
                        {showFullRecipe ? "Show Less" : "View Full Recipe"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export const RecipeCard_sm = ({
    recipe,
    onToggleFavorite,
    isFavorite,
}: RecipeCardProps) => {
    const [showFullRecipe, setShowFullRecipe] = useState(false);

    const totalTime =
        (recipe.prep_time_minutes || 0) + (recipe.cook_time_minutes || 0);
    const discountedIngredients = recipe.ingredients.filter(
        (ing) => ing.isDiscounted,
    );

    return (
        <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-sm leading-tight">
                        {recipe.title}
                    </CardTitle>
                    {onToggleFavorite && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onToggleFavorite(recipe.id)}
                            className={
                                isFavorite
                                    ? "text-destructive"
                                    : "text-muted-foreground"
                            }
                        >
                            <Heart
                                className={`w-3 h-3 ${isFavorite ? "fill-current" : ""}`}
                            />
                        </Button>
                    )}
                </div>

                {recipe.description && (
                    <p className="text-xs text-muted-foreground">
                        {recipe.description}
                    </p>
                )}

                <div className="flex flex-wrap gap-2 mt-2">
                    {recipe.difficulty_level && (
                        <Badge
                            className={`text-[10px] ${difficultyColors[recipe.difficulty_level]}`}
                        >
                            <ChefHat className="w-3 h-3 mr-1" />
                            {recipe.difficulty_level}
                        </Badge>
                    )}

                    {totalTime > 0 && (
                        <Badge variant="outline" className="text-[10px]">
                            <Clock className="w-3 h-3 mr-1" />
                            {totalTime}min
                        </Badge>
                    )}

                    <Badge variant="outline" className="text-[10px]">
                        <Users className="w-3 h-3 mr-1" />
                        {recipe.servings} servings
                    </Badge>

                    {recipe.calories && (
                        <Badge variant="outline" className="text-[10px]">{recipe.calories} cal</Badge>
                    )}

                    {recipe.cuisine_type && (
                        <Badge variant="secondary" className="text-[10px]">{recipe.cuisine_type}</Badge>
                    )}
                </div>

            </CardHeader>

            <CardContent className="pt-0">
                <div className="space-y-3">
                    <div>
                        <h4 className="text-xs font-semibold mb-2">
                            Ingredients:
                        </h4>
                        <div className="space-y-1">
                            {recipe.ingredients
                                .slice(0, showFullRecipe ? undefined : 3)
                                .map((ingredient, index) => (
                                    <div
                                        key={index}
                                        className={`text-xs flex items-center gap-2 ${
                                            ingredient.isDiscounted
                                                ? "text-savings font-medium"
                                                : "text-muted-foreground"
                                        }`}
                                    >
                                        <span className="w-2 h-2 rounded-full bg-current opacity-50" />
                                        {ingredient.amount} {ingredient.unit}{" "}
                                        {ingredient.name}

                                    </div>
                                ))}
                            {!showFullRecipe &&
                                recipe.ingredients.length > 3 && (
                                    <div className="text-xs text-muted-foreground">
                                        +{recipe.ingredients.length - 3} more
                                        ingredients...
                                    </div>
                                )}
                        </div>
                    </div>

                    {showFullRecipe && (
                        <div>
                            <h4 className="text-xs font-semibold mb-2">
                                Instructions:
                            </h4>
                            <div className="space-y-2">
                                {recipe.cooking_steps.map((step, index) => (
                                    <div
                                        key={index}
                                        className="text-xs text-muted-foreground"
                                    >
                                        <span className="font-medium text-foreground">
                                            {index + 1}.
                                        </span>{" "}
                                        {step}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFullRecipe(!showFullRecipe)}
                        className="w-full text-xs"
                    >
                        {showFullRecipe ? "Show Less" : "View Full Recipe"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};