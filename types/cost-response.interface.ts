export interface CostResponse {
    rajaongkir: CostRajaongkir;
}

export interface CostRajaongkir {
    query: CostQuery;
    status: CostStatus;
    origin_details: CostOriginDetails;
    destination_details: CostDestinationDetails;
    results: CostResult[];
}

export interface CostQuery {
    origin: string;
    destination: string;
    weight: number;
    courier: string;
}

export interface CostStatus {
    code: number;
    description: string;
}

export interface CostOriginDetails {
    city_id: string;
    province_id: string;
    province: string;
    type: string;
    city_name: string;
    postal_code: string;
}

export interface CostDestinationDetails {
    city_id: string;
    province_id: string;
    province: string;
    type: string;
    city_name: string;
    postal_code: string;
}

export interface CostResult {
    code: string;
    name: string;
    costs: CostDetail[];
}

export interface CostDetail {
    service: string;
    description: string;
    cost: Cost[];
}

export interface Cost {
    value: number;
    etd: string;
    note: string;
}
