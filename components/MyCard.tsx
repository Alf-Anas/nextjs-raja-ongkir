import React, { ReactNode } from "react";

type Props = {
    title: string;
    children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default function MyCard({
    title,
    children,
    className,
    ...props
}: Props) {
    return (
        <div
            className={`p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${className}`}
            {...props}
        >
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {title}
            </h5>
            <div>{children}</div>
        </div>
    );
}
