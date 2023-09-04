import { ROUTE } from "@/constants/route";
import { SESSION_STORAGE } from "@/constants/session-storage";
import { AuthStatus } from "@/types/auth-status";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useSession = () => {
    const router = useRouter();
    const [message, setMessage] = useState({
        message: "",
        updateAt: new Date().getTime(),
    });
    const [status, setStatus] = useState<AuthStatus>(AuthStatus.LOADING);
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        const getToken = sessionStorage.getItem(SESSION_STORAGE.TOKEN);
        if (getToken) {
            setToken(getToken);
            setStatus(AuthStatus.AUTHENTICATED);
        } else {
            setStatus(AuthStatus.UNAUTHENTICATED);
        }
    }, []);

    async function login(email = "", password = "") {
        if (!email || !password) {
            setMessage({
                message: "Email and password must not empty!",
                updateAt: new Date().getTime(),
            });
            setStatus(AuthStatus.UNAUTHENTICATED);
        } else if (email === "admin@mail.com" && password === "12345678") {
            setMessage({
                message: "Login success!",
                updateAt: new Date().getTime(),
            });
            setStatus(AuthStatus.AUTHENTICATED);
            const mToken = process.env.NEXT_PUBLIC_RAJA_ONGKIR_TOKEN || "";
            setToken(mToken);
            sessionStorage.setItem(SESSION_STORAGE.TOKEN, mToken);
        } else {
            setMessage({
                message: "Email and password not match!",
                updateAt: new Date().getTime(),
            });
            setStatus(AuthStatus.UNAUTHENTICATED);
        }
    }
    async function logout() {
        setStatus(AuthStatus.UNAUTHENTICATED);
        sessionStorage.removeItem(SESSION_STORAGE.TOKEN);
        setMessage({
            message: "Logout success!",
            updateAt: new Date().getTime(),
        });
        router.push(ROUTE.LOGIN);
    }

    return { login, logout, message, status, token };
};
export default useSession;
