import { SESSION_STORAGE } from "@/constants/session-storage";
import axios from "axios";

export const HOST = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
export const HOST_NEXT = axios.create();

HOST_NEXT.interceptors.request.use(
    (config) => {
        const getToken = sessionStorage.getItem(SESSION_STORAGE.TOKEN);
        if (getToken) {
            config.headers["key"] = getToken;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

const API = {
    getProvince: (api_key: string, id?: string) =>
        HOST.get(`/starter/province`, {
            params: {
                id,
            },
            headers: {
                key: api_key,
            },
        }),
    getCity: (api_key: string, id?: string, province?: string) =>
        HOST.get(`/starter/city`, {
            params: {
                id,
                province,
            },
            headers: {
                key: api_key,
            },
        }),

    postCost: (
        api_key: string,
        origin: string,
        destination: string,
        weight: string,
        courier: string
    ) => {
        const formData = new FormData();
        formData.append("origin", origin);
        formData.append("destination", destination);
        formData.append("weight", weight);
        formData.append("courier", courier);
        return HOST.post(`/starter/cost`, formData, {
            headers: {
                key: api_key,
            },
        });
    },

    getProvinceNext: ({ id }: { id?: string }) =>
        HOST_NEXT.get(`/api/province`, {
            params: {
                id,
            },
        }),

    getCityNext: ({ id, province }: { id?: string; province?: string }) =>
        HOST_NEXT.get(`/api/city`, {
            params: {
                id,
                province,
            },
        }),

    postCostNext: ({
        origin,
        destination,
        weight,
        courier,
    }: {
        origin: string;
        destination: string;
        weight: number;
        courier: string;
    }) => {
        const formData = new FormData();
        formData.append("origin", origin);
        formData.append("destination", destination);
        formData.append("weight", String(weight));
        formData.append("courier", courier);
        return HOST_NEXT.post(`/api/cost`, formData, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
    },
};

export default API;
