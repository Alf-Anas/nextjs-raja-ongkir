import { ImgHTMLAttributes } from "react";

export default function MyImg({
    alt = "",
    src = "",
    ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} src={src} {...props} />;
}
