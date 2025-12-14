import {
  type ApiGetAllProducts,
  type ApiOneCandyData,
  type ApiCompletedOrder,
  type CreateOrderRequest,
} from "./bortakvall-API.types";
//Import everything needed
import { BASE_URL } from "./selector";

//Get all products from API
export const getProductsData = async () => {
  const response = await fetch(`${BASE_URL}/api/v2/products`);

  if (!response.ok) {
    throw new Error("Response was not ok");
  }
  const data: ApiGetAllProducts = await response.json();
  return data;
};

//Get one product from API
export const getOneProduct = async (id: number) => {
  const response = await fetch(`${BASE_URL}/api/v2/products/${id}`);

  if (!response.ok) {
    throw new Error("Response was not ok");
  }
  const data: ApiOneCandyData = await response.json();
  console.log(data);
  return data;
};

//Function to POST completed order and get success or fail answer
export const OrderComplete = async (order: CreateOrderRequest) => {
  const response = await fetch(
    "https://www.bortakvall.se/api/v2/users/83/orders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
  }

  const data: ApiCompletedOrder = await response.json();
  console.log(data);
  return data;
};
