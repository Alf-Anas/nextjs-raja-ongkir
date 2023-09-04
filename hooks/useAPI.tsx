import { ObjectLiteral } from "@/types/object-literal.interface";
import { errorResponse, getValObject } from "@/utils";
import { useState } from "react";

type ArgsProps = {
    onError?: (err: any) => void;
    dataKey?: string;
    listkey?: string;
    metaKey?: string;
};

const useAPI = <
    DataType,
    ParamsType = ObjectLiteral,
    ListType = ObjectLiteral[],
    MetaType = ObjectLiteral
>(
    API: Function,
    args?: ArgsProps
) => {
    const [data, setData] = useState<DataType | null>(null);
    const [list, setList] = useState<ListType | null>(null);
    const [meta, setMeta] = useState<MetaType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const call = (params?: ParamsType) => {
        setLoading(true);
        API(params || {})
            .then((res: any) => {
                const datas = res.data;
                if (!datas) throw new Error(res.status.toString());
                setError(null);
                if (args?.dataKey) {
                    setData(getValObject(datas, args.dataKey, {}));
                } else {
                    setData(datas);
                }
                if (args?.listkey) {
                    setList(getValObject(datas, args.listkey, []));
                }
                if (args?.metaKey) {
                    setMeta(getValObject(datas, args.metaKey, {}));
                }
            })
            .catch((err: any) => {
                setData(null);
                setError(errorResponse(err));
                if (args?.onError) {
                    args.onError(errorResponse(err));
                }
                if (args?.listkey) {
                    setList(null);
                }
                if (args?.metaKey) {
                    setMeta(null);
                }
            })
            .finally(() => setLoading(false));
    };

    return { data, loading, error, call, list, meta };
};
export default useAPI;
