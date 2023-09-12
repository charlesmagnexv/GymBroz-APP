import { AxiosResponse } from "axios"
import api from "./api"
import { User } from "../model/User"

export interface LoginDTO {
  acessToken: string
  refreshToken: string
  user: User
}

export interface LoginPost {
  email: string;
  password: string;
}

export const signIn = async ({ email, password }: LoginPost): Promise<AxiosResponse<LoginDTO>> => {
  const response = await api.post(`/auth/login`, {
    email,
    password,
  })
  return response;
}
