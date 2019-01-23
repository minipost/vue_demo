import axios from "axios";

const API_URL = "http://localhost/api/";
class APIService {
  public async get(request: string) {
    const url = API_URL + request;
    const response = await axios.get(url, {
      headers: { "Content-Type": "application/json" }
    });
    console.log(response);
    return response.data;
  }
  public async post(path: string, object: any) {
    const url = API_URL + path;
    axios.post(url,object)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  constructor() {}
}

export const api = new APIService();
