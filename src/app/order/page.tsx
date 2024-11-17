import React from "react";
import Link from "next/link";
import CreateOrderBtn from "@/app/order/components/CreateOrderBtn";
import { Grid } from "@mui/system";
import { Typography } from "@mui/material";
import BeerOptions from "@/app/order/components/BeerOptions";

interface OrderPageProps {}

const OrderPage: React.FC<OrderPageProps> = () => {
  return (
    <Grid container spacing={4} flexDirection="column" alignItems="center">
      <Grid size={6}>
        <Typography variant="h2" gutterBottom>
          Create Order
        </Typography>
      </Grid>
      <Grid size={6}>
        <BeerOptions />
      </Grid>
      <Grid size={6}>
        <CreateOrderBtn />
      </Grid>
      <Grid size={6}>
        <Link href="/">Back to main</Link>
      </Grid>
    </Grid>
  );
};

export default OrderPage;
