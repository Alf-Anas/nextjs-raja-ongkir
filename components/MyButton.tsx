import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
    variant: Variant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type Variant = "primary";

function getVariantClassName(variant: Variant) {
    switch (variant) {
        case "primary":
            return "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
        default:
            return "";
    }
}

export default function MyButton({
    children,
    variant,
    className,
    ...props
}: Props) {
    return (
        <button
            className={`${getVariantClassName(variant)} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
