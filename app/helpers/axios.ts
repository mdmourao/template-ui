import axios from "axios";

import { addAccessTokenToLocalStorage, getAccessTokenFromLocalStorage } from "./auth";

const customFetch = axios.create({
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true,
});

export default customFetch;

customFetch.interceptors.request.use(
    async (config) => {
        const token = getAccessTokenFromLocalStorage();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const refreshToken = async () => {
    try {
        const resp = await axios.post("api/refresh");
        console.log("refresh token", resp.data);
        return resp.data;
    } catch (e) {
        console.log("Error", e);
    }
};

customFetch.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const resp = await refreshToken();
            const access_token = resp.data.access_token;

            addAccessTokenToLocalStorage(access_token);
            customFetch.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${access_token}`;
            return customFetch(originalRequest);
        }

        if (window.location.pathname !== "/login") {
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);