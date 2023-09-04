import { ObjectLiteral } from "@/types/object-literal.interface";

export function safeArray<T = ObjectLiteral>(arr: any, defaultValue = []) {
    if (Array.isArray(arr) && arr.length > 0) {
        return arr as T[];
    }
    return defaultValue as T[];
}

export function safeObject<T = ObjectLiteral>(obj: any, defaultValue = {}) {
    if (!!obj && typeof obj === "object") {
        return obj as T;
    }
    return defaultValue as T;
}

export function safeString(str: any, defaultValue = "", stringify = false) {
    if (!!str && typeof str === "string") {
        return str;
    } else if (typeof str === "number") {
        return String(str);
    } else if (stringify && typeof str === "object") {
        return JSON.stringify(str);
    }
    return defaultValue;
}

export function safeNumber(num: any, defaultValue = 0) {
    if (typeof num === "number") {
        return num;
    }
    return defaultValue;
}

export function getValObject(obj: any, key = "", defaultValue: any = "") {
    if (!!obj && typeof obj === "object") {
        const splitKey = key.split(".");
        let value: any = obj;
        for (let i = 0; i < splitKey.length; i++) {
            value = safeObject(value)[splitKey[i]];
        }
        return value || defaultValue;
    }
    return defaultValue;
}

export const errorResponse = (err: any, arrayBuffer = false): string => {
    let msg = "";

    if (err.response) {
        if (arrayBuffer) {
            try {
                const resAsString = new TextDecoder().decode(err.response.data);
                const resAsJSON = JSON.parse(resAsString);
                if (resAsJSON?.error) {
                    return "Dokumen Gagal di panggil : " + resAsJSON?.message;
                } else {
                    return "Error : " + resAsJSON?.message;
                }
            } catch (err) {
                msg = getValObject(err, "err.response.data.message");
            }
        } else {
            msg = err.response.status + " " + err.response.statusText;
            if (err.response.data?.message) {
                msg = err.response.data?.message;
            } else if (err.response.data?.messages) {
                msg = err.response.data?.messages;
            }
        }
    } else if (err.message) {
        msg = err.message;
    } else if (typeof err === "string") {
        msg = err;
    } else {
        msg = safeString(err, "", true);
    }
    return msg;
};
