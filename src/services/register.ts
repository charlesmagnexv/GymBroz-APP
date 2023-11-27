import { AxiosResponse } from "axios"
import api from "./api"
import { User } from "../model/User"

export interface RegisterUserPost {
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface ResponseRegisterDTO {
    user: User
    message: string
}

export interface RegisterDTO {
    acessToken: string
    refreshToken: string
    user: User
  }

export const signUp = async ({
    firstName,
    lastName,
    email,
    password,
}: RegisterUserPost): Promise<AxiosResponse<ResponseRegisterDTO>> => {
    const response = await api.post(`/auth/signup`, { firstName, lastName, email, password })
    return response;
}

export const confirmEmail = async (confirmEmailToken: string): Promise<AxiosResponse> => {
    const response = await api.post(`/auth/confirm_email/${confirmEmailToken}`)
    return response;
}