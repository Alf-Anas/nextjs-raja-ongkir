import API from "@/configs/api";
import { getValObject, safeString } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";

export type ResponseData = any;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === "GET") {
        const query = req.query;
        const { id } = query;
        const { key } = req.headers;
        const thisId = safeString(id);
        const thisKey = safeString(key);

        try {
            const response = await API.getProvince(
                thisKey,
                thisId || undefined
            );
            res.status(200).json(response.data);
        } catch (err) {
            res.status(500).json(
                getValObject(err, "response.data", JSON.stringify(err))
            );
        }
    } else {
        res.status(404).json({ code: 404, message: "Not Found!" });
    }
}
