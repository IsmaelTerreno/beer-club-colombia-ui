import React from "react";
import { ResponseApi } from "@/app/order/model.dto";
import SelectBeer from "@/app/order/components/SelectBeer";
import { Paper } from "@mui/material";

const BeerOptions = async () => {
  const response = await fetch("http://localhost:8000/api/v1/stock/current");
  const responseApi: ResponseApi = await response.json();
  const stock = responseApi.data;
  return (
    <Paper className="p-8">
      <SelectBeer stock={stock} />
    </Paper>
  );
};

export default BeerOptions;
