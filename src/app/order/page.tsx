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
      <Grid>
        <Typography variant="h1" gutterBottom>
          Order
        </Typography>
      </Grid>
      <Grid>
        <BeerOptions />
      </Grid>
      <Grid>
        <CreateOrderBtn />
      </Grid>
      <Grid>
        <Link href="/">Back to main</Link>
      </Grid>
    </Grid>
  );
};

export default OrderPage;
