import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterState } from "@/types/types";
import { Search, Filter, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface FilterBarProps {
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    categories: string[];
}

const stores = ["Woolworths", "Coles", "Aldi", "IGA"];

export const FilterBar = ({
    filters,
    onFiltersChange,
    categories,
}: FilterBarProps) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const updateFilters = (updates: Partial<FilterState>) => {
        onFiltersChange({ ...filters, ...updates });
    };

    const toggleStore = (store: string) => {
        const newStores = filters.stores.includes(store)
            ? filters.stores.filter((s) => s !== store)
            : [...filters.stores, store];
        updateFilters({ stores: newStores });
    };

    const toggleCategory = (category: string) => {
        const newCategories = filters.categories.includes(category)
            ? filters.categories.filter((c) => c !== category)
            : [...filters.categories, category];
        updateFilters({ categories: newCategories });
    };

    const clearFilters = () => {
        onFiltersChange({
            stores: [],
            categories: [],
            searchTerm: "",
            minDiscount: 0,
            maxPrice: 1000,
        });
    };

    const activeFiltersCount =
        filters.stores.length +
        filters.categories.length +
        (filters.searchTerm ? 1 : 0) +
        (filters.minDiscount > 0 ? 1 : 0) +
        (filters.maxPrice < 1000 ? 1 : 0);

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground bg-primary/5" />
                <Input
                    placeholder="Search products..."
                    value={filters.searchTerm}
                    onChange={(e) =>
                        updateFilters({ searchTerm: e.target.value })
                    }
                    className="pl-10"
                />
            </div>

            {/* Filter Toggle */}
            <div className="flex gap-5">
                <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <CollapsibleTrigger asChild>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 bg-white"
                        >
                            <Filter className="h-4 w-4" />
                            Filters
                            {activeFiltersCount > 0 && (
                                <Badge variant="secondary" className="ml-1">
                                    {activeFiltersCount}
                                </Badge>
                            )}
                        </Button>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="mt-4">
                        <Card>
                            <CardContent className="p-4 space-y-4">
                                {/* Stores Filter */}
                                <div>
                                    <h4 className="text-sm font-semibold mb-2">
                                        Stores
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {stores.map((store) => (
                                            <div
                                                key={store}
                                                className="flex items-center space-x-2"
                                            >
                                                <Checkbox
                                                    id={store}
                                                    checked={filters.stores.includes(
                                                        store,
                                                    )}
                                                    onCheckedChange={() =>
                                                        toggleStore(store)
                                                    }
                                                />
                                                <label
                                                    htmlFor={store}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {store}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Categories Filter */}
                                {categories.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-semibold mb-2">
                                            Categories
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {categories
                                                .slice(0, 8)
                                                .map((category) => (
                                                    <div
                                                        key={category}
                                                        className="flex items-center space-x-2"
                                                    >
                                                        <Checkbox
                                                            id={category}
                                                            checked={filters.categories.includes(
                                                                category,
                                                            )}
                                                            onCheckedChange={() =>
                                                                toggleCategory(
                                                                    category,
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor={category}
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            {category}
                                                        </label>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )}

                                {/* Price and Discount Range */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold">
                                            Min Discount %
                                        </label>
                                        <Input
                                            type="number"
                                            value={filters.minDiscount}
                                            onChange={(e) =>
                                                updateFilters({
                                                    minDiscount: Number(
                                                        e.target.value,
                                                    ),
                                                })
                                            }
                                            min="0"
                                            max="100"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold">
                                            Max Price $
                                        </label>
                                        <Input
                                            type="number"
                                            value={filters.maxPrice}
                                            onChange={(e) =>
                                                updateFilters({
                                                    maxPrice: Number(
                                                        e.target.value,
                                                    ),
                                                })
                                            }
                                            min="0"
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </CollapsibleContent>
                </Collapsible>

                {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" className="bg-white" onClick={clearFilters}>
                        <X className="h-4 w-4 mr-1" />
                        Clear
                    </Button>
                )}
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2">
                    {filters.stores.map((store) => (
                        <Badge
                            key={store}
                            variant="secondary"
                            className="flex items-center gap-1"
                        >
                            {store}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => toggleStore(store)}
                            />
                        </Badge>
                    ))}
                    {filters.categories.map((category) => (
                        <Badge
                            key={category}
                            variant="secondary"
                            className="flex items-center gap-1"
                        >
                            {category}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => toggleCategory(category)}
                            />
                        </Badge>
                    ))}
                    {filters.searchTerm && (
                        <Badge
                            variant="secondary"
                            className="flex items-center gap-1"
                        >
                            "{filters.searchTerm}"
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() =>
                                    updateFilters({ searchTerm: "" })
                                }
                            />
                        </Badge>
                    )}
                </div>
            )}
        </div>
    );
};
