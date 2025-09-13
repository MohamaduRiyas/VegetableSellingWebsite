export interface Product {
  id: number;
  name: string;
  tamilName: string;
  weight: string;
  // FIX: Added price property to Product type
  price: number;
  imageUrl: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
