export interface User {
    id: number
    name: string
    email: string
    role: string
    country: string
}

export interface UserWithPassword extends User {
    password: string
}