import React from "react";
import Link from "next/link";
import CreateOrderBtn from "@/app/order/components/CreateOrderBtn";
import { Grid } from "@mui/system";
import { Typography } from "@mui/material";
import ManageOrderSection from "@/app/order/components/ManageOrderSection";

interface OrderPageProps {}

const OrderPage: React.FC<OrderPageProps> = () => {
  return (
    <Grid
      container
      spacing={4}
      flexDirection="column"
      alignItems="center"
      className="bg-gradient-to-b from-black to-purple-900"
    >
      <Grid size={6}>
        <Typography variant="h4" gutterBottom className="mt-10">
          Order management
        </Typography>
      </Grid>
      <Grid size={6}>
        <ManageOrderSection />
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
