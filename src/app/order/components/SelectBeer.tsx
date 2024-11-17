"use client";
import React from "react";
import { Stock } from "@/app/order/model.dto";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";

interface SelectBeerProps {
  stock: Stock;
}

const SelectBeer: React.FC<SelectBeerProps> = ({ stock }) => {
  const [beerSelected, setBeerSelected] = React.useState<string>("1");

  const handleChange = (event: SelectChangeEvent) => {
    setBeerSelected(event.target.value);
  };
  const totalBeers =
    (stock &&
      stock.beers &&
      stock.beers.reduce((acc, beer) => acc + beer.quantity, 0)) ||
    0;
  return (
    <Grid container flexDirection="column">
      <Grid>
        <Grid container flexDirection="row" justifyContent="space-between">
          <Grid>
            <Typography variant="subtitle1" gutterBottom>
              Total available {totalBeers} beers.
            </Typography>
          </Grid>
          <Grid>
            <Typography variant="subtitle1" gutterBottom>
              Last update at {new Date(stock.last_updated).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Divider className="mb-5" />
      </Grid>
      <Grid>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Beer selection</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={beerSelected || ""}
            label="Select Beer"
            onChange={handleChange}
          >
            {stock &&
              stock.beers &&
              stock.beers.map((beer) => (
                <MenuItem key={beer.id} value={beer.id}>
                  {beer.name} - Price: ${beer.price_per_unit} - Available:{" "}
                  {beer.quantity}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default SelectBeer;
