import API from "./client.js";

export const getProducts = async () => {
    const response = await API.get('/stripe/products');
    console.log("Response from API", response.data);
    return response.data;
}

export const getSubscribeSession = async (plan) => {
    const response = await API.get(`/stripe/checkout/subscribe?plan=${plan}`);
    return response.data;
}

export const getCompleteSession = async (sessionId) => {
    const response = await API.get(`/stripe/checkout/complete?session_id=${sessionId}`);
    return response.data;
}