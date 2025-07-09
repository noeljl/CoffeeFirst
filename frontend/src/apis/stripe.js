import API from "./client.js";

export const getProducts = async () => {
    const response = await API.get('/stripe/products');
    console.log("Response from API", response.data);
    return response.data;
}

export const getSubscribeSession = async (plan) => {
    const response = await API.get(`/stripe/subscribe?plan=${plan}`);
    return response.data;
}