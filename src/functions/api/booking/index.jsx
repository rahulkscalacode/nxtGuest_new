import { apiCall } from "../apiGlobal";

export async function bookingDetails(params) {
  const res = await apiCall("get", `/user/booking-details/${params}`);
  return res;
}
