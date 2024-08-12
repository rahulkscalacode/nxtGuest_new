import { apiCall } from "../apiGlobal";

export async function loginApi(obj) {
  const res = await apiCall("post", "/auth/login", obj, null);

  return res;
}

export async function register(obj) {
  const res = await apiCall("post", "/auth/register", obj, null);

  return res;
}
