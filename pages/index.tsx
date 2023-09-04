import MyButton from "@/components/MyButton";
import MyInput from "@/components/MyInput";
import MySelect from "@/components/MySelect";
import MyCostResult from "@/components/MyCostResult";
import MainLayout from "@/components/layout/MainLayout";
import API from "@/configs/api";
import useAPI from "@/hooks/useAPI";
import { CityResponse, CityResults } from "@/types/city-response.interface";
import { CostResponse, CostResult } from "@/types/cost-response.interface";
import { ObjectLiteral } from "@/types/object-literal.interface";
import {
    ProvinceResponse,
    ProvinceResult,
} from "@/types/province-response.interface";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const COURIER_LIST = [
    { value: "jne", label: "JNE" },
    { value: "pos", label: "POS" },
    { value: "tiki", label: "Tiki" },
];

export default function HomePage() {
    const [formData, setFormData] = useState({
        weight: 1,
        courier: COURIER_LIST[0].value,
    });
    const [origin, setOrigin] = useState({
        province: "",
        city: "",
    });
    const [destination, setDestination] = useState({
        province: "",
        city: "",
    });
    const [showResult, setShowResult] = useState(false);

    const apiOriginProvince = useAPI<
        ProvinceResponse,
        ObjectLiteral,
        ProvinceResult[]
    >(API.getProvinceNext, {
        listkey: "rajaongkir.results",
    });

    const apiOriginCity = useAPI<CityResponse, ObjectLiteral, CityResults[]>(
        API.getCityNext,
        {
            listkey: "rajaongkir.results",
        }
    );
    const apiDestinationProvince = useAPI<
        ProvinceResponse,
        ObjectLiteral,
        ProvinceResult[]
    >(API.getProvinceNext, {
        listkey: "rajaongkir.results",
    });

    const apiDestinationCity = useAPI<
        CityResponse,
        ObjectLiteral,
        CityResults[]
    >(API.getCityNext, {
        listkey: "rajaongkir.results",
    });

    const apiCost = useAPI<CostResponse, ObjectLiteral, CostResult[]>(
        API.postCostNext,
        {
            listkey: "rajaongkir.results",
        }
    );

    useEffect(() => {
        apiOriginProvince.call();
        apiDestinationProvince.call();
    }, []);

    useEffect(() => {
        if (!origin.province) return;
        apiOriginCity.call({ province: origin.province });
    }, [origin.province]);

    useEffect(() => {
        if (!destination.province) return;
        apiDestinationCity.call({ province: destination.province });
    }, [destination.province]);

    useEffect(() => {
        setShowResult(false);
    }, [origin, destination, formData]);

    function onCheckCost() {
        if (
            !origin.city ||
            !destination.city ||
            !formData.weight ||
            !formData.courier
        ) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Periksa kembali inputan data!",
            });
            return;
        }

        apiCost.call({
            ...formData,
            origin: origin.city,
            destination: destination.city,
        });
    }

    useEffect(() => {
        if (apiCost.data) {
            setShowResult(true);
        }
    }, [apiCost.data]);

    return (
        <MainLayout>
            <div className="w-full pt-12 items-center justify-center max-w-lg mx-auto px-4 space-y-4">
                <div>
                    <p>Kota Asal</p>
                    <div className="md:flex md:space-x-4 max-md:space-y-2">
                        <MySelect
                            label="Provinsi"
                            onChange={(e) => {
                                setOrigin({
                                    province: e.target.value,
                                    city: "",
                                });
                            }}
                            value={origin.province}
                            className="md:w-1/2"
                        >
                            <option value="">--- Pilih Provinsi ---</option>
                            {apiOriginProvince.list?.map((province, idx) => {
                                return (
                                    <option
                                        key={idx}
                                        value={province.province_id}
                                    >
                                        {province.province}
                                    </option>
                                );
                            })}
                        </MySelect>
                        <MySelect
                            label="Kota"
                            onChange={(e) => {
                                setOrigin({
                                    ...origin,
                                    city: e.target.value,
                                });
                            }}
                            value={origin.city}
                            className="md:w-1/2"
                        >
                            <option value="">--- Pilih Kota ---</option>
                            {apiOriginCity.list?.map((city, idx) => {
                                return (
                                    <option key={idx} value={city.city_id}>
                                        {city.type} {city.city_name}
                                    </option>
                                );
                            })}
                        </MySelect>
                    </div>
                </div>
                <div>
                    <p>Kota Tujuan</p>
                    <div className="md:flex md:space-x-4 max-md:space-y-2">
                        <MySelect
                            label="Provinsi"
                            onChange={(e) => {
                                setDestination({
                                    province: e.target.value,
                                    city: "",
                                });
                            }}
                            value={destination.province}
                            className="md:w-1/2"
                        >
                            <option value="">--- Pilih Provinsi ---</option>
                            {apiDestinationProvince.list?.map(
                                (province, idx) => {
                                    return (
                                        <option
                                            key={idx}
                                            value={province.province_id}
                                        >
                                            {province.province}
                                        </option>
                                    );
                                }
                            )}
                        </MySelect>
                        <MySelect
                            label="Kota"
                            onChange={(e) => {
                                setDestination({
                                    ...destination,
                                    city: e.target.value,
                                });
                            }}
                            value={destination.city}
                            className="md:w-1/2"
                        >
                            <option value="">--- Pilih Kota ---</option>
                            {apiDestinationCity.list?.map((city, idx) => {
                                return (
                                    <option key={idx} value={city.city_id}>
                                        {city.type} {city.city_name}
                                    </option>
                                );
                            })}
                        </MySelect>
                    </div>
                </div>
                <div className="md:flex md:space-x-4 max-md:space-y-2">
                    <MyInput
                        label="Berat (Kg)"
                        type="number"
                        className="w-full md:w-1/2"
                        value={formData.weight}
                        onChange={(e) => {
                            const eVal = Number(e.target.value);
                            if (eVal < 0) return;
                            setFormData({
                                ...formData,
                                weight: eVal,
                            });
                        }}
                    />
                    <MySelect
                        label="Kurir"
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                courier: e.target.value,
                            });
                        }}
                        value={formData.courier}
                        className="w-full md:w-1/2"
                    >
                        {COURIER_LIST.map((courier, idx) => {
                            return (
                                <option key={idx} value={courier.value}>
                                    {courier.label}
                                </option>
                            );
                        })}
                    </MySelect>
                </div>
                <MyButton
                    variant="primary"
                    className="w-full"
                    onClick={onCheckCost}
                    disabled={apiCost.loading}
                >
                    {apiCost.loading ? "Loading..." : "Cek Ongkir"}
                </MyButton>

                {showResult && (
                    <MyCostResult
                        className="py-8"
                        results={apiCost.list || []}
                        isLoading={apiCost.loading}
                    />
                )}
            </div>
        </MainLayout>
    );
}
