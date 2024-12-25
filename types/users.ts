export interface User {
  id: number
  name: string
  email: string
  mobile: string
  image: string
}

export interface UsersResponse {
  users: User[]
}

