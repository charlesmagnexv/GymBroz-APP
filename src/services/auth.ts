import { AxiosResponse } from "axios"
import api from "./api"
import { User } from "../model/User"

export interface LoginDTO {
  acessToken: string
  refreshToken: string
  user: User
}

export interface RenewTokenDTO {
  acessToken: string
  newRefreshToken: string
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

export const renewToken = async (refresh_token: string): Promise<AxiosResponse<RenewTokenDTO>> => {
  const response = await api.post(`/auth/refresh_token`, {
    refreshToken: refresh_token
  })
  return response
}