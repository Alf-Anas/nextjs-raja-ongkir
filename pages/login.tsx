import MyButton from "@/components/MyButton";
import MyInput from "@/components/MyInput";
import MainLayout from "@/components/layout/MainLayout";
import { ROUTE } from "@/constants/route";
import useSession from "@/hooks/useSession";
import { AuthStatus } from "@/types/auth-status";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function LoginPage() {
    const router = useRouter();
    const session = useSession();
    const [data, setData] = useState({ email: "", password: "" });

    function onClickLogin() {
        session.login(data.email, data.password);
    }

    useEffect(() => {
        if (session.status === AuthStatus.AUTHENTICATED) {
            router.push(ROUTE.HOME);
        }
    }, [router, session.status]);

    useEffect(() => {
        if (session.message.message && session.status === AuthStatus.UNAUTHENTICATED) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: session.message.message,
            });
        }
    }, [session.message, session.status]);

    return (
        <MainLayout>
            <div className="w-full pt-12 items-center justify-center">
                <form className="max-w-md mx-auto">
                    <MyInput
                        label="Email"
                        className="mb-6"
                        type="email"
                        id="email"
                        placeholder="name@mail.com"
                        required
                        value={data.email}
                        onChange={(e) =>
                            setData((oldState) => ({
                                ...oldState,
                                email: e.target.value,
                            }))
                        }
                    />
                    <MyInput
                        label="Password"
                        className="mb-2"
                        type="password"
                        id="password"
                        placeholder="********"
                        required
                        value={data.password}
                        onChange={(e) =>
                            setData((oldState) => ({
                                ...oldState,
                                password: e.target.value,
                            }))
                        }
                    />
                    <p className="text-red-500 text-xs mb-2">
                        Email : admin@mail.com, Pass : 12345678
                    </p>
                    <MyButton
                        type="button"
                        variant="primary"
                        onClick={onClickLogin}
                    >
                        LOGIN
                    </MyButton>
                </form>
            </div>
        </MainLayout>
    );
}
