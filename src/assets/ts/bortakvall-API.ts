export const getProductsData = async () => {
    const response = await fetch("https://www.bortakvall.se/api/v2/products");
    console.log(response);

    if (!response.ok) {
        throw new Error("Response was not ok");
    }
    const data = await response.json();
    return data;
};