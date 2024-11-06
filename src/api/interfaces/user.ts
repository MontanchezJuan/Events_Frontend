export interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
  userProfile: null;
}

export type RoleName = "admin" | "organizer" | "user" | "unauthenticated";

export interface Role {
  id: string;
  name: RoleName;
  description: string;
  status: number;
  totalPermissions: TotalPermission[];
}

export interface TotalPermission {
  id: string;
  route: string;
  method: string;
  description: string;
  status: number;
}