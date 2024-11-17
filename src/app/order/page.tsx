import React from "react";
import Link from "next/link";
import CreateOrderBtn from "@/app/order/components/CreateOrderBtn";
import { Grid } from "@mui/system";
import { Typography } from "@mui/material";

interface OrderPageProps {}

interface Beer {
  id: number;
  name: string;
  price_per_unit: number;
  quantity: number;
}

interface Stock {
  id: number;
  last_updated: string;
  beers: Beer[];
}

interface ResponseApi {
  message: string;
  data: Stock;
}

const OrderPage: React.FC<OrderPageProps> = async () => {
  const response = await fetch("http://localhost:8000/api/v1/stock/current");
  const responseApi: ResponseApi = await response.json();
  const stock = responseApi.data;

  return (
    <Grid container spacing={4} flexDirection="column" alignItems="center">
      <Grid>
        <Typography variant="h1" gutterBottom>
          Order
        </Typography>
      </Grid>
      <Grid>
        {stock &&
          stock.beers &&
          stock.beers.map((beer) => (
            <Grid key={beer.id} container spacing={2}>
              <Grid size={8}>
                <Typography variant="h4" gutterBottom>
                  {beer.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Price per unit: {beer.price_per_unit}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Quantity: {beer.quantity}
                </Typography>
              </Grid>
            </Grid>
          ))}
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
