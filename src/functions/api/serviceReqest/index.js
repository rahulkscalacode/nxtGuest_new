import { apiCall } from "../apiGlobal";

export async function selfserviceReqest(obj) {
  const res = await apiCall("post", "/service/self", obj, null);
  return res;
}

export async function otherServiceReqest(obj) {
  const res = await apiCall("post", "/service/others", obj, null);
  return res;
}

export async function groupServiceReqest(obj) {
  const res = await apiCall("post", "/service/group", obj, null);
  return res;
}