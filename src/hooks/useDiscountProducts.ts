import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DiscountedProduct, FilterState } from '@/types/types';
import { useToast } from '@/components/ui/use-toast';

export const useDiscountProducts = (filters: FilterState) => {
  const [products, setProducts] = useState<DiscountedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const { toast } = useToast();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('discounted_products')
        .select('*')
        .eq('is_active', true)
        .order('percentage_off', { ascending: false });

      // Apply filters
      if (filters.stores.length > 0) {
        query = query.in('store_name', filters.stores);
      }

      if (filters.categories.length > 0) {
        query = query.in('category', filters.categories);
      }

      if (filters.searchTerm) {
        query = query.ilike('product_name', `%${filters.searchTerm}%`);
      }

      if (filters.minDiscount > 0) {
        query = query.gte('percentage_off', filters.minDiscount);
      }

      if (filters.maxPrice < 1000) {
        query = query.lte('discounted_price', filters.maxPrice);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load discount products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('discounted_products')
        .select('category')
        .not('category', 'is', null)
        .eq('is_active', true);

      if (error) throw error;

      const uniqueCategories = [...new Set(data?.map(item => item.category).filter(Boolean))] as string[];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    products,
    loading,
    categories,
    refetch: fetchProducts,
  };
};