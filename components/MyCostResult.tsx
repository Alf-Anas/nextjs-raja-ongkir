import { CostResult } from "@/types/cost-response.interface";
import React from "react";
import MyCard from "./MyCard";

type Props = {
    results: CostResult[];
    isLoading: boolean;
    className?: string;
};

export default function MyCostResult({
    results = [],
    isLoading = false,
    className = "",
}: Props) {
    return (
        <div className={className}>
            {!isLoading && results.length === 0 && (
                <p className="text-red-500">Data Tidak Ditemukan!</p>
            )}
            {results.map((result, idx) => {
                return (
                    <div key={idx}>
                        <p className="font-bold">{result.name}</p>
                        <div className="grid md:grid-cols-2 gap-4 my-4">
                            {result.costs.map((cost, idy) => {
                                return (
                                    <MyCard title={cost.service} key={idy}>
                                        <p className="text-gray-500">
                                            {cost.description}
                                        </p>
                                        {cost.cost.map((co, idz) => {
                                            return (
                                                <div key={idz}>
                                                    <div className="flex justify-between">
                                                        <p>Estimasi (hari) :</p>
                                                        <b>{co.etd}</b>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <p>Biaya (Rp) :</p>
                                                        <b>{co.value}</b>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <p>Catatan :</p>
                                                        <b>{co.note}</b>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </MyCard>
                                );
                            })}
                            {result.costs.length === 0 && (
                                <p className="text-red-500">
                                    Tidak ada pengiriman!
                                </p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
