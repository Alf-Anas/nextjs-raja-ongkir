import MyButton from "@/components/MyButton";
import MainLayout from "@/components/layout/MainLayout";
import { ROUTE } from "@/constants/route";
import useSession from "@/hooks/useSession";
import { AuthStatus } from "@/types/auth-status";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

    return (
        <MainLayout>
            <div className="w-full pt-12 items-center justify-center">
                <form className="max-w-md mx-auto">
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
                    </div>
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
