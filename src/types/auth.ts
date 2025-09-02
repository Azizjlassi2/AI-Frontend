export interface AccountBase {
  id: number;
}

interface Task {
  id: number;
  name: string;
}
interface Stats {
  used: number;
  stars: number;
  discussions: number;
}

interface Developer {
  id: number;
  username: string;
}

interface Model {
  id: number;
  name: string;
  description: string;
  developer: Developer;
  tasks: Task[];
  stats: Stats;
  createdAt: string;
}

export interface DeveloperAccount extends AccountBase {
  web_site?: string;
  bio?: string;
  phone_number?: number;
  address?: string;
  linkedin?: string;
  github?: string;
  docker_username?: string;
  docker_pat?: string;
  models?: Model[];
  favoriteModels: Model[];
}

export interface ClientAccount extends AccountBase {
  web_site?: string;
  bio?: string;
  phone_number?: number;
  address?: string;
  linkedin?: string;
  github?: string;
  models?: Model[];
  favoriteModels?: Model[];
}

export type AdminAccount = AccountBase;

export type UserRole = "DEVELOPER" | "CLIENT" | "ADMIN";

export interface LoginData {
  isAuthenticated: string;
  token: string;
  refresh_token: string;
  expiresAt: string;
  tokenType: string;
  email: string;
  username: string;
  role: UserRole;
  account: DeveloperAccount | ClientAccount | AdminAccount;
  createdAt: string;
  updateAt: string;
}

export interface ApiResponse<T> {
  timestamp: string;
  success: boolean;
  message: string;
  data: T;
  metadata?: any;
}

export interface AuthState {
  isAuthenticated: string;
  email: string;
  username: string;
  role: UserRole;
  account: DeveloperAccount | ClientAccount | AdminAccount;
  token: string | null;
  tokenType: string;
  refreshToken: string | null;
  expiresAt: string | null;
  createdAt: string;
  updateAt: string;

  loading: boolean;
}
export interface LoginCredentials {
  email: string;
  password: string;
}
