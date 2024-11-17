export interface Beer {
  id: number;
  name: string;
  price_per_unit: number;
  quantity: number;
}

export interface Stock {
  id: number;
  last_updated: string;
  beers: Beer[];
}

export interface ResponseApi {
  message: string;
  data: Stock;
}
