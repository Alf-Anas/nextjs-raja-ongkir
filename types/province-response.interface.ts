export interface ProvinceResponse {
    rajaongkir: ProvinceRajaongkir;
}

export interface ProvinceRajaongkir {
    query: any[];
    status: ProvinceStatus;
    results: ProvinceResult[];
}

export interface ProvinceStatus {
    code: number;
    description: string;
}

export interface ProvinceResult {
    province_id: string;
    province: string;
}
