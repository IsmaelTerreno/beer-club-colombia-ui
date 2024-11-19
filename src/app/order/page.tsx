import React from "react";
import { Grid } from "@mui/system";
import { Typography } from "@mui/material";
import ManageOrderSection from "@/app/order/components/ManageOrderSection";

interface OrderPageProps {}

const OrderPage: React.FC<OrderPageProps> = async () => {
  // const response = await fetch("http://localhost:8000/api/v1/stock/current", {
  //   cache: "no-store",
  // });
  // const responseApi: ResponseApi<Stock> = await response.json();
  // const stock = responseApi.data;
  return (
    <Grid container spacing={4} flexDirection="column" alignItems="center">
      <Grid size={6}>
        <Typography
          variant="h4"
          className="mt-5 text-2xl font-bold text-center bg-black rounded-full p-4"
        >
          Order management
        </Typography>
      </Grid>
      <Grid size={6}>
        <ManageOrderSection />
      </Grid>
    </Grid>
  );
};

export default OrderPage;
