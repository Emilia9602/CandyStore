import { BASE_URL } from "./selector";
import type { orderData } from "./bortakvall-API.types";

export const getProductsData = async () => {
  const response = await fetch(`${BASE_URL}/api/v2/products`);
  //console.log(response);

  if (!response.ok) {
    throw new Error("Response was not ok");
  }
  const data = await response.json();
  return data;
};

export const getOneProduct = async (id: number) => {
  const response = await fetch(`${BASE_URL}/api/v2/products/${id}`);
  //console.log(response);

  if (!response.ok) {
    throw new Error("Response was not ok");
  }
  const data = await response.json();
  return data;
};

export const OrderComplete = async (order: orderData) => {
  const response = await fetch(
    "https://www.bortakvall.se/api/v2/users/83/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
};
