export type UserRole = 'ADMIN' | 'MODERATOR' | 'STUDENT'

export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    role: UserRole
}

export interface AuthState {
    user: User | null
    accessToken: string | null
    isAuthenticated: boolean
}

export interface SignInCredentials {
    email: string
    password: string
}

export interface AuthResponse {
    success: boolean
    accessToken?: string
    user?: User
    error?: string
    code?: string
    details?: any[]
}