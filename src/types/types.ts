export interface DiscountedProduct {
    id: string;
    product_name: string;
    original_price: number;
    discounted_price: number;
    percentage_off: number;
    store_name: "Woolworths" | "Coles" | "Aldi" | "IGA";
    category?: string;
    image_url?: string;
    product_url?: string;
    scraped_at: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Influencers {
    id: string;
    full_name: string;
    plateform: string;
    subscriber_or_follower_count: string;
    imageurl: string;
    notes: string;
}

export interface Recipe {
    id: string;
    title: string;
    description?: string;
    ingredients: Array<{
        name: string;
        amount: string;
        unit: string;
        isDiscounted?: boolean;
        productId?: string;
    }>;
    cooking_steps: string[];
    calories?: number;
    prep_time_minutes?: number;
    cook_time_minutes?: number;
    servings: number;
    difficulty_level?: "Easy" | "Medium" | "Hard";
    cuisine_type?: string;
    generated_from_discounts: boolean;
    discount_products_used: string[];
    created_at: string;
    updated_at: string;
}

export interface UserFavorite {
    id: string;
    user_id?: string;
    recipe_id: string;
    created_at: string;
}

export interface FilterState {
    stores: string[];
    categories: string[];
    searchTerm: string;
    minDiscount: number;
    maxPrice: number;
}
