export interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
  userProfile: UserProfile;
}

export type RoleName = "admin" | "organizer" | "user" | "unauthenticated";

export interface Role {
  id: string;
  name: RoleName;
  description: string;
  status: number;
  totalPermissions: Permission[];
}

export interface Permission {
  id: string;
  route: string;
  method: string;
  description: string;
  status: number;
}

export interface UserProfile {
  id: string;
  name: string;
  profilePhoto: string;
}

export interface UserEvent {
  email: string;
  image: string;
  inscription_id: string;
  name: string;
  participated: boolean;
  user_id: string;
}
