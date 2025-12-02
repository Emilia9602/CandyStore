export interface CandyData {
  id: number;
  name: string;
  price: number;
  on_sale: boolean;
  stock_quantity: 5;
  stock_status: string;
  images: { large: string; thumbnail: string };
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  on_sale: boolean;
  images: { thumbnail: string; large: string };
}

export interface OneCandyData {
  status: string;
  data: Product;
}

export interface CartItem extends Product {
  cartQty: number;
}

export interface CandyDataOrderItem {
  product_id: number;
  product_name: string;
  qty: number;
  item_price: number;
  item_total: number;
}

export interface productPageOneCandyData {
  description: string;
  id: number;
  images: { thumbnail: string; large: string };
  name: string;
  on_sale: boolean;
  price: number;
  stock_quantity: number;
  stock_status: string;
}

export type oneCandyOrderData = Omit<CandyDataOrderItem, "product_name">;

export interface orderData {
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_postcode: string;
  customer_city: string;
  customer_email: string;
  customer_phone?: string;
  order_total: number;
  order_items: oneCandyOrderData[];
}
