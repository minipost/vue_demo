import axios from "axios";



export const API_URL = "http://localhost/api/";
class APIService {
  public async get(request: string) {
    const url = API_URL + request;
    let response
    try {
      console.log(url)
      response = await axios.get(url, {
        headers: { "Content-Type": "application/json" }
      });

    } catch (error) {
      // console.log(error)
      response = await error.response;
    }
    return response
  }
  public async post(path: string, object: any) {
    const url = API_URL + path;
    return axios.post(url,object)
      // .then((response) => {
      //   console.log(response);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
  }
  constructor() {}
}

export const api = new APIService();
