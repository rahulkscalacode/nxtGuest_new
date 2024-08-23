import axios from "axios";
import Cookies from "universal-cookie";

export async function apiCall(method, url, data=null,params=null,controller=null,header=null) {
  const cookies = new Cookies();
  try {
    return await axios({
      baseURL:process.env.REACT_APP_NXTGUEST_API_URI,
      method: method,
      url: url,
      data: data,
      params: params,
      headers:{...header,
      "Authorization": `Bearer ${cookies.get("token")}`
      },
      ...(controller && {signal:controller.signal})
    });
  } catch (err) {
    if(err.message!=="canceled")
    console.log("apiCallErr=>",err);
    throw err;
  }
}
