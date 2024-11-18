import { Beer } from "./beer.dto";

export interface Stock {
  id: number;
  created: Date;

  last_updated: string;

  beers: Beer[];
}
