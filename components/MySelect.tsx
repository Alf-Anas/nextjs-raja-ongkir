import React, { ReactNode } from "react";

type Props = {
    label?: string;
    children: ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function MySelect({
    label: selectLabel,
    children,
    className,
    ...props
}: Props) {
    const thisId = new Date().getTime().toString();
    return (
        <div className={className}>
            {selectLabel && (
                <label
                    htmlFor={thisId}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    {selectLabel}
                </label>
            )}

            <select
                id={thisId}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...props}
            >
                {children}
            </select>
        </div>
    );
}
