'use server'
import { setCookies } from "@/actions/setCookies"
import axios from "axios"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export type User = {
  Id:       string
  Name:     string
  Email:    string
  Password: string
  Profile:  string
  About:    string
}

export type Posts = {
  Profile: string
  Name: string
  Message: string
}

const API_USER = "https://social-backend-5jnh.onrender.com/user/"
const API_POSTAGENS = "https://social-backend-5jnh.onrender.com/postagens/"

//API USER
export const USER_LOGIN = async(email: string, password: string) => {
  const response = (await axios.get(`${API_USER}?email=${email}&password=${password}`)).data
  if (response.Message === "OK") {
    setCookies('token', response.Id)
    revalidatePath("/home")
    redirect("/home")
  } else {
    return response

  }
}

export const USER_CADASTRO = async(id: string,username: string, email: string, password: string) => {
  const response = await axios.post(API_USER+"cadastrar", {
    Id: id,
    Name: username,
    Email: email,
    Password: password,
    Profile: '',
    About: '',
  })

  if (response.data.Message === "OK") {
    setCookies('token', id)
    revalidatePath('/home')
    redirect("/home")
  }
}

export const GET_USER_BY_EMAIL = async(email: string) => {
  const response = await axios.get(API_USER+email)
  if (response.data.Message === "OK") {
    return true
  } else {
    return false
  }
}

export const GET_USER_BY_ID = async(id: string) => {
  const response = await axios.get(`${API_USER}usuario/${id}`)
  if (response.data === '') {
    revalidatePath("/login")
    redirect('/login')
  } else {
    return response.data as User
  }
}

//Atualizar Dados Cadastrais
export const UPDATE_USER_DATA = async(id: string, user: User) => {
  const response = await axios.post(`${API_USER}atualizarDados/${id}`, {
    Id: user.Id,
    Name: user.Name,
    Email: user.Email,
    Password: user.Password,
    Profile: user.Profile,
    About: user.About,
  })

  return response.data
}

//API POST
export const GET_POSTAGENS = async() => {
  const response = (await axios.get(API_POSTAGENS)).data
  return response as Posts[]
}

export const POST_POSTAGENS = async(username: string, message: string, Profile: string) => {
  await axios.post(`${API_POSTAGENS}postar`, {
    Name: username,
    Message: message,
    Profile: Profile,
  })
}