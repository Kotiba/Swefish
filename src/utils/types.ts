// Type definitions for menu items

export interface WeightOption {
  weight: string;
  price: number;
}

export interface MenuItem {
  title: string;
  description: string;
  price: number | null;
  image: string;
  fullWidth?: boolean;
  isTopRated?: boolean;
  weightOptions?: WeightOption[];
  allergens?: string[];
  oldPrice?: number | null;
  hasMultiplePrices?: boolean;
}

export interface MenuCategory {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface MenuData {
  menuCategories: MenuCategory[];
} 