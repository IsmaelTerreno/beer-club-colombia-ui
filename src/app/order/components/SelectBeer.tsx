"use client";
import React from "react";
import { Stock } from "@/app/order/model.dto";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

interface SelectBeerProps {
  stock: Stock;
}

const SelectBeer: React.FC<SelectBeerProps> = ({ stock }) => {
  const [beerSelected, setBeerSelected] = React.useState<string>("1");

  const handleChange = (event: SelectChangeEvent) => {
    setBeerSelected(event.target.value);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Last update at {new Date(stock.last_updated).toLocaleString()}
      </Typography>
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
    </div>
  );
};

export default SelectBeer;
