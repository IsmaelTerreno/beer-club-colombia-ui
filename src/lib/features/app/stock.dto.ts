import { Beer } from "./beer.dto";

export interface Stock {
  id: number;
  last_updated: string;
  beers: Beer[];
}
