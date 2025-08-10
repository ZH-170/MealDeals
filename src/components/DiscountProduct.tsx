import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DiscountedProduct } from "@/types/types";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DiscountProductProps {
    product: DiscountedProduct;
    onAddToRecipe?: (product: DiscountedProduct) => void;
}

const storeColors = {
    Woolworths: "bg-store-woolworths",
    Coles: "bg-store-coles",
    Aldi: "bg-store-aldi",
    IGA: "bg-store-iga",
};

export const DiscountProduct = ({
    product,
    onAddToRecipe,
}: DiscountProductProps) => {
    const savings = product.original_price - product.discounted_price;

    return (
        <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                        <h3 className="font-semibold text-sm leading-tight mb-2">
                            {product.product_name}
                        </h3>
                        <Badge
                            className={`${storeColors[product.store_name]} text-white text-xs`}
                        >
                            {product.store_name}
                        </Badge>
                    </div>
                    {product.image_url && (
                        <img
                            src={product.image_url}
                            alt={product.product_name}
                            className="w-16 h-16 object-cover rounded ml-2"
                        />
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-savings">
                                ${product.discounted_price.toFixed(2)}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                                ${product.original_price.toFixed(2)}
                            </span>
                        </div>
                        <Badge variant="destructive" className="bg-discount">
                            {product.percentage_off}% OFF
                        </Badge>
                    </div>

                    <div className="text-sm text-savings font-medium">
                        Save ${savings.toFixed(2)}
                    </div>

                    {product.category && (
                        <Badge variant="outline" className="text-xs">
                            {product.category}
                        </Badge>
                    )}

                    <div className="flex gap-2 mt-3">
                        {onAddToRecipe && (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onAddToRecipe(product)}
                                className="flex-1"
                            >
                                <ShoppingCart className="w-3 h-3 mr-1" />
                                Add to Recipe
                            </Button>
                        )}
                        {product.product_url && (
                            <Button size="sm" variant="ghost" asChild>
                                <a
                                    href={product.product_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center"
                                >
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
