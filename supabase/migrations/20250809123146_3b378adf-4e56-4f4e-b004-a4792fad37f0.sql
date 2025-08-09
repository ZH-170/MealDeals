-- Create table for discounted products
CREATE TABLE public.discounted_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name TEXT NOT NULL,
  original_price DECIMAL(10,2) NOT NULL,
  discounted_price DECIMAL(10,2) NOT NULL,
  percentage_off INTEGER NOT NULL,
  store_name TEXT NOT NULL CHECK (store_name IN ('Woolworths', 'Coles', 'Aldi', 'IGA')),
  category TEXT,
  image_url TEXT,
  product_url TEXT,
  scraped_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for recipes
CREATE TABLE public.recipes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  ingredients JSONB NOT NULL,
  cooking_steps TEXT[] NOT NULL,
  calories INTEGER,
  prep_time_minutes INTEGER,
  cook_time_minutes INTEGER,
  servings INTEGER DEFAULT 4,
  difficulty_level TEXT CHECK (difficulty_level IN ('Easy', 'Medium', 'Hard')),
  cuisine_type TEXT,
  generated_from_discounts BOOLEAN DEFAULT true,
  discount_products_used UUID[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for user favorites (for future authentication)
CREATE TABLE public.user_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  recipe_id UUID REFERENCES public.recipes(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, recipe_id)
);

-- Enable Row Level Security
ALTER TABLE public.discounted_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to products and recipes
CREATE POLICY "Products are viewable by everyone" 
ON public.discounted_products 
FOR SELECT 
USING (true);

CREATE POLICY "Recipes are viewable by everyone" 
ON public.recipes 
FOR SELECT 
USING (true);

-- Create policies for favorites (will work when auth is implemented)
CREATE POLICY "Users can view their own favorites" 
ON public.user_favorites 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own favorites" 
ON public.user_favorites 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" 
ON public.user_favorites 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_discounted_products_store ON public.discounted_products(store_name);
CREATE INDEX idx_discounted_products_category ON public.discounted_products(category);
CREATE INDEX idx_discounted_products_active ON public.discounted_products(is_active);
CREATE INDEX idx_discounted_products_scraped_at ON public.discounted_products(scraped_at);
CREATE INDEX idx_recipes_difficulty ON public.recipes(difficulty_level);
CREATE INDEX idx_recipes_cuisine ON public.recipes(cuisine_type);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_discounted_products_updated_at
  BEFORE UPDATE ON public.discounted_products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_recipes_updated_at
  BEFORE UPDATE ON public.recipes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();