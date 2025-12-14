// API Get all products type
export interface ApiGetAllProducts {
  status: string;
  data: CandyData[];
}

// Get all products type
export interface CandyData {
  id: number;
  name: string;
  price: number;
  on_sale: boolean;
  stock_quantity: number;
  stock_status: string;
  images: {
    large: string;
    thumbnail: string;
  };
}

// API Get ONE products type
export interface ApiOneCandyData {
  status: string;
  data: OneCandyData;
}

//Get ONE products type
export interface OneCandyData {
  description: string;
  id: number;
  images: { thumbnail: string; large: string };
  name: string;
  on_sale: boolean;
  price: number;
  stock_quantity: number;
  stock_status: string;
}

//CartItem with OneCandyData + cartQty
export interface CartItem extends OneCandyData {
  cartQty: number;
}

// Full ORDER Request
export interface CreateOrderRequest {
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_postcode: string;
  customer_city: string;
  customer_email: string;
  customer_phone?: string;
  order_total: number;
  order_items: CreateOrderItemRequest[];
}

//ORDER Request product
export interface CreateOrderItemRequest {
  product_id: number;
  qty: number;
  item_price: number;
  item_total: number;
}

//Api Full ORDER Response
export interface ApiCompletedOrder {
  status: string;
  data: CompletedOrder;
  message?: string;
}

// Order Response data
export interface CompletedOrder {
  id: number;
  user_id: number;
  order_date: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_postcode: string;
  customer_city: string;
  customer_email: string;
  customer_phone: string;
  order_total: number;
  created_at: string;
  updated_at: string;
  items: CompletedOrderItem[];
}

// Order Response data products
export interface CompletedOrderItem {
  id: number;
  order_id: number;
  product_id: number;
  qty: number;
  item_price: number;
  item_total: number;
}

// Cart item used on checkout page
export interface CheckoutCartItem {
  product_id: number;
  product_name: string;
  images: { thumbnail: string; large: string };
  qty: number;
  item_price: number;
  item_total: number;
}

// Helper for showing Ordered items on order-complete page
export interface orderNamesArrayType {
  items: CartItem[];
}
