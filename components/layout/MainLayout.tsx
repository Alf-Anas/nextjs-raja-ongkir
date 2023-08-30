import { ReactNode, useEffect } from "react";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import useSession from "@/hooks/useSession";
import { useRouter } from "next/router";
import { AuthStatus } from "@/types/auth-status";
import { ROUTE } from "@/constants/route";
import LoadingIndicator from "../LoadingIndicator";

type Props = {
    children: ReactNode;
};

export default function MainLayout({ children }: Props) {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (
            router.pathname !== ROUTE.LOGIN &&
            session.status === AuthStatus.UNAUTHENTICATED
        ) {
            router.push(ROUTE.LOGIN);
        }
    }, [router, session.status]);

    return (
        <>
            <MainHeader />
            <main className="min-h-[calc(100vh-64px-52px)]">
                {session.status === AuthStatus.LOADING ? (
                    <div className="w-full items-center justify-center">
                        <LoadingIndicator />
                    </div>
                ) : (
                    <>{children}</>
                )}
            </main>
            <MainFooter />
        </>
    );
}
