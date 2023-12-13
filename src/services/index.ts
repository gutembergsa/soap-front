import Axios from "axios";
import { Contact } from "../App";

const BASE_URL = "http://localhost:3000";

export const get = () =>
  Axios.get(BASE_URL).then(({ data }) => {
    return data;
  });

export const post = (body: Contact) =>
  Axios.post(BASE_URL, body).then((response) => {
    return response.data;
  });

export const put = (id: string, body: Contact) =>
  Axios.put(`${BASE_URL}/${id}`, body).then((response) => {
    return response.data;
  });

export const del = (id: string) =>
  Axios.delete(`${BASE_URL}/${id}`).then((response) => {
    return response.data;
  });
