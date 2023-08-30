import Link from "next/link";
import MyImg from "../MyImg";
import MyButton from "../MyButton";
import useSession from "@/hooks/useSession";
import { AuthStatus } from "@/types/auth-status";

export default function MainHeader() {
    const session = useSession();

    function loggingOut() {
        session.logout();
    }
    return (
        <nav
            className="bg-white border-gray-200 dark:bg-gray-900"
            id="main-layout-header"
        >
            <div className="flex flex-wrap items-center mx-auto p-4 justify-between">
                <Link href="/" className="flex items-center ml-4">
                    <MyImg src="/logo.png" alt="LOGO" className="h-7 mr-2" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        RAJA ONGKIR
                    </span>
                </Link>
                {session.status === AuthStatus.AUTHENTICATED && (
                    <MyButton
                        type="button"
                        variant="primary"
                        onClick={loggingOut}
                    >
                        LOGOUT
                    </MyButton>
                )}
            </div>
        </nav>
    );
}
