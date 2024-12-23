import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export const logout = () => {
  Cookies.remove("token")
  Cookies.remove("user")
  window.location.href = "/login"
}

export const getUser = () => {
  const userStr = Cookies.get("user")
  if (!userStr) return null
  
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export const getToken = () => {
  return Cookies.get("token")
}

export const isAdmin = () => {
  const user = getUser()
  return user?.role === "admin"
} 