import { apiCall } from "../apiGlobal";

export async function createPaymentIntent (obj) {
    const res = await apiCall("post", "/payment/create-payment-intent",obj, null )
    return res;
} 

export async function createStripeAccount (obj){
    const res = await apiCall("post","/payment/create-stripe-account", obj, null)
    return res;
}