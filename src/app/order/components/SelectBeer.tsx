"use client";
import React from "react";
import { Beer, Stock } from "@/app/order/model.dto";
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

interface SelectBeerProps {
  stock: Stock;
}

const SelectBeer: React.FC<SelectBeerProps> = ({ stock }) => {
  const [beerSelected, setBeerSelected] = React.useState<Beer | undefined>(
    undefined,
  );
  const [rounds, setRounds] = React.useState<Beer[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedBeer = stock.beers.find(
      (beer) => beer.id === Number(event.target.value),
    );
    console.log("selectedBeer", selectedBeer);
    setBeerSelected(selectedBeer);
  };
  const totalBeers =
    (stock &&
      stock.beers &&
      stock.beers.reduce((acc, beer) => acc + beer.quantity, 0)) ||
    0;
  const addBeerToRound = () => {
    const beer = stock.beers.find((beer) => beer.id === beerSelected?.id);
    if (beer) {
      setRounds([...rounds, beer]);
    }
  };
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
            value={beerSelected ? beerSelected.id.toString() : ""}
            label="Select Beer"
            onChange={handleChange}
          >
            {stock &&
              stock.beers &&
              stock.beers.map((beer) => (
                <MenuItem key={beer.id} value={beer.id.toString()}>
                  {beer.name} - Price: ${beer.price_per_unit} - Available:{" "}
                  {beer.quantity}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid>
        <Button
          variant="contained"
          endIcon={<AddShoppingCartIcon />}
          className="mt-10"
          onClick={addBeerToRound}
        >
          Add to round
        </Button>
      </Grid>
      <Grid></Grid>
    </Grid>
  );
};

export default SelectBeer;
