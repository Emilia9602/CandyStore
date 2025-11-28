export interface CandyData {
  id: number;
  name: string;
  price: number;
  on_sale: boolean;
  stock_quantity: 5;
  stock_status: string;
  images: { large: string; thumbnail: string };
}

export interface OneCandyData {
  id: number;
  name: string;
  description: string;
  price: number;
  on_sale: boolean;
  images: { thumbnail: string; large: string };
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
