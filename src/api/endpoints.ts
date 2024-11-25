export const ENDPOINTS_SECURITY = {
  LIST_USERS: "/users",
  USER_BY_ID: "/users/",
  LOGIN: "/security/login",
  SIGN_UP: "/security/sign-up",
  GET_USER: "/security/get-user",
  AUTHENTICATED_USER_PROFILE: '/profiles/get-user',
};

export type ENDPOINTS_SECURITY_Type = typeof ENDPOINTS_SECURITY;

export const ENDPOINTS_BUSINESS = {
  LIST_EVENTS: "/events/list",
  EVENT_BY_ID: "/events/",
  CREATE_EVENT: "/events/create",
};

export type ENDPOINTS_BUSINESS_Type = typeof ENDPOINTS_BUSINESS;
