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
        const { id, province } = query;
        const { key } = req.headers;
        const thisId = safeString(id);
        const thisProvince = safeString(province);
        const thisKey = safeString(key);

        try {
            const response = await API.getCity(
                thisKey,
                thisId || undefined,
                thisProvince || undefined
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
