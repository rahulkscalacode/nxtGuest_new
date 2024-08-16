import { apiCall } from "../apiGlobal";

export async function selfserviceReqest(obj) {
  const res = await apiCall("post", "/service/self", obj, null);
  return res;
}
