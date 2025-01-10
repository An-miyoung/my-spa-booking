import axios from "axios";
import { BASE_URL } from "./constants";

export const getJWTHeader = (userToken: string): Record<string, string> => {
  return { Authorization: `Bearer ${userToken}` };
};

export const axiosInstance = axios.create({ baseURL: BASE_URL });
