export const ENDPOINTS_SECURITY = {
  LIST_USERS: "/users",
  USER: "/users/",
  LOGIN: "/security/login",
  SIGN_UP: "/security/sign-up",
  GET_USER: "/security/get-user",
  AUTHENTICATED_USER_PROFILE: "/profiles/get-user",
};

export type ENDPOINTS_SECURITY_Type = typeof ENDPOINTS_SECURITY;

export const EVENT_ENDPOINTS = {
  LIST_EVENTS: "/events/list",
  LIST_MY_EVENTS: "/events/list-events/",
  EVENT: "/events/",
  CREATE_EVENT: "/events/create",
};

export type EVENT_ENDPOINTS_Type = typeof EVENT_ENDPOINTS;

export const INSCRIPTIONS_ENDPOINTS = {
  LIST_INSCRIPTIONS: "/inscriptions/list",
  INSCRIPTION: "/inscriptions/",
  CREATE_INSCRIPTION: "/inscriptions/create",
};

export type INSCRIPTIONS_ENDPOINTS_Type = typeof INSCRIPTIONS_ENDPOINTS;
