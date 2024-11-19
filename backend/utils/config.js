// Config
export const port = 3030;
export const ip = "0.0.0.0";
export const frontend = "localhost:3030";

// Endpoints
export const rootEndpoint = "/";
export const userEndpoint = "/user";
export const authEndpoint = "/auth";
export const vehicleEndpoint = "/vehicle";

// DB Connection string
const dbUser = "logbookUser";
const dbPassword = "HelloJake4512";
const dbName = "LogbookDB";
export const dbConnectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.lqjh8.mongodb.net/${dbName}`;

// Misc
export const accessToken = "super_secret_access_token";
