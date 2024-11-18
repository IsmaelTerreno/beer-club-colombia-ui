import React from "react";
import { Stock } from "@/lib/features/app/stock.dto";
import SelectBeer from "@/app/order/components/SelectBeer";
import { Paper } from "@mui/material";
import { ResponseApi } from "@/lib/features/app/response-api.dto";

const BeerOptions = async () => {
  const response = await fetch("http://localhost:8000/api/v1/stock/current", {
    cache: "no-store",
  });
  const responseApi: ResponseApi<Stock> = await response.json();
  const stock = responseApi.data;
  return (
    <Paper className="p-8">
      <SelectBeer stock={stock} />
    </Paper>
  );
};

export default BeerOptions;
