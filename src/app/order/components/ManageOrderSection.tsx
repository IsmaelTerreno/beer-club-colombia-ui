import React from "react";
import ManageOrderForm from "@/app/order/components/ManageOrderForm";
import { Paper } from "@mui/material";
import { ResponseApi } from "@/lib/features/app/response-api.dto";
import { Stock } from "@/lib/features/app/stock.dto";
import Link from "next/link";

const ManageOrderSection = async () => {
  const response = await fetch("http://localhost:8000/api/v1/stock/current", {
    cache: "no-store",
  });
  const responseApi: ResponseApi<Stock> = await response.json();
  const stock = responseApi.data;
  return (
    <Paper className="p-8">
      <ManageOrderForm stock={stock} />
      <Link href="/">Back to main</Link>
    </Paper>
  );
};

export default ManageOrderSection;
