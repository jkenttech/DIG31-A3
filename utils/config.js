// Config
export const port = 3000;
export const ip = "0.0.0.0";

// Endpoints
export const rootEndpoint = "/";
export const loginEndpoint = "/login";

export function api(endpoint){ return `/api${endpoint}`; }

