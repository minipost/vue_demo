import axios from "axios";

export const API_URL = "http://localhost/api/";
class APIService {
  private async handleRequest<T>(request: Promise<T>) {
    let response: T;
    try {
      response = await request;
    } catch (error) {
      if (await error.response) {
        response = error.response;
      } else {
        alert(error)
        throw(error)
      }
    }
    // console.log(response)
    return response;
  }
  public async get(request: string, contentType: string = "application/json") {
    const url = API_URL + request;
    const response = this.handleRequest(
      axios.get(url, {
        headers: { "Content-Type": contentType }
      })
    );
    return response;
  }
  public async post(
    path: string,
    object: any,
    contentType: string = "application/json"
  ) {
    const url = API_URL + path;
    const response = this.handleRequest(
      axios.post(url, object, {
        headers: { "Content-Type": contentType }
      })
    );
    return response;
  }
  constructor() {}
}

export const api = new APIService();
