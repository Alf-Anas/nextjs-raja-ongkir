import API from "@/configs/api";
import { ObjectLiteral } from "@/types/object-literal.interface";
import { getValObject, safeString } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";

export type ResponseData = any;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === "POST") {
        const formBody: ObjectLiteral = await req.body;
        const { key } = req.headers;
        const thisOrigin = safeString(formBody.origin);
        const thisDestination = safeString(formBody.destination);
        const thisWeight = safeString(formBody.weight);
        const thisCourier = safeString(formBody.courier);
        const thisKey = safeString(key);

        try {
            const response = await API.postCost(
                thisKey,
                thisOrigin,
                thisDestination,
                thisWeight,
                thisCourier
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
