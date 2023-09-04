export interface CityResponse {
    rajaongkir: CityRajaongkir;
}

export interface CityRajaongkir {
    query: CityQuery;
    status: CityStatus;
    results: CityResults[];
}

export interface CityQuery {
    id: string;
}

export interface CityStatus {
    code: number;
    description: string;
}

export interface CityResults {
    city_id: string;
    province_id: string;
    province: string;
    type: string;
    city_name: string;
    postal_code: string;
}
