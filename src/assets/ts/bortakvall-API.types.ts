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
