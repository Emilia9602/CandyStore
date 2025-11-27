export interface CandyData {
  id: number;
  name: string;
  price: number;
  on_sale: false;
  stock_quantity: 5;
  stock_status: string;
  images: { large: string; thumbnail: string };
}

export interface CandyDataOrderItem {
  product_id: number;
  qty: number;
  item_price: number;
  item_total: number;
}