import { BASE_URL } from "./selector";

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
