
const baseUrl ="http://localhost:3000";

const createEndpoint = (baseUrl) => (endpoint) => {
    return `${baseUrl}/${endpoint}`;
};

export const loginEndpoint = {url: createEndpoint(baseUrl)("user/login"), method:"POST"}
export const getUsersEndpoint = {url: createEndpoint(baseUrl)("user"), method:"GET"}

