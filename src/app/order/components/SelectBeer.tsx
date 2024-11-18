"use client";
import React from "react";
import { Stock } from "@/lib/features/app/stock.dto";
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MessageApp, { MessageAppProps } from "@/app/order/components/MessageApp";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import SaveIcon from "@mui/icons-material/Save";
import { Beer } from "@/lib/features/app/beer.dto";
import { selectOrders } from "@/lib/features/order/orderSlice";
import { useSelector } from "react-redux";

interface SelectBeerProps {
  stock: Stock;
}

const SelectBeer: React.FC<SelectBeerProps> = ({ stock }) => {
  const [beerSelected, setBeerSelected] = React.useState<Beer | undefined>(
    undefined,
  );
  const [rounds, setRounds] = React.useState<Beer[]>([]);
  const [open, setOpen] = React.useState(false);
  const [messageApp, setMessageApp] = React.useState<MessageAppProps>({
    message: "",
    severity: "info",
    setOpen,
    open: false,
  });

  const handleChange = (event: SelectChangeEvent) => {
    const selectedBeer = stock.beers.find(
      (beer) => beer.id === Number(event.target.value),
    );
    setBeerSelected(selectedBeer);
  };

  const totalBeers =
    (stock &&
      stock.beers &&
      stock.beers.reduce((acc, beer) => acc + beer.quantity, 0)) ||
    0;

  const addBeerToRound = () => {
    const beer = stock.beers.find((beer) => beer.id === beerSelected?.id);
    const isBeerInRound = rounds.find((round) => round.id === beer?.id);
    if (beer && !isBeerInRound && beer.id) {
      beer.quantity = 1;
      setRounds([...rounds, beer]);
      setMessageApp({
        message: "Added beer to the round.",
        severity: "info",
        setOpen,
        open,
      });
      setOpen(true);
    } else {
      if (beer?.id) {
        setMessageApp({
          message: "Beer already in the round.",
          severity: "warning",
          setOpen,
          open,
        });
        setOpen(true);
      }
    }
  };

  const updateBeerInRoundPlusOne = (beer: Beer) => {
    beer.quantity += 1;
    setRounds([...rounds]);
  };
  const updateBeerInRoundMinusOne = (beer: Beer) => {
    if (beer.quantity > 1) {
      beer.quantity -= 1;
      setRounds([...rounds]);
    } else {
      const newRounds = rounds.filter((round) => round.id !== beer.id);
      setRounds(newRounds);
    }
  };
  const currentOrder = useSelector(selectOrders);
  console.log(currentOrder);
  return (
    <>
      <MessageApp
        message={messageApp.message}
        severity={messageApp.severity}
        setOpen={setOpen}
        open={open}
      />
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
                Last Stock update at{" "}
                {new Date(stock.last_updated).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Divider className="mb-5" />
        </Grid>
        <Grid>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Beer selection
            </InputLabel>
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
                  <MenuItem
                    key={beer.id + "-menu-item"}
                    value={beer.id.toString()}
                  >
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
            className="mt-10 mb-10"
            onClick={addBeerToRound}
          >
            Add beer to round
          </Button>
        </Grid>
        <Grid>
          <Typography variant="h6" gutterBottom>
            Selected beers for the current round
          </Typography>
          <Divider className="mb-5" />
        </Grid>
        <Grid>
          <Grid container flexDirection="column">
            {rounds.length === 0 && (
              <Typography variant="body1">
                No beers selected for the round.
              </Typography>
            )}
            {rounds.map((beer) => (
              <div key={beer.id + "-round-item"}>
                <Grid container flexDirection="row">
                  <Grid size={8}>
                    <Typography variant="body1">{beer.name}</Typography>
                    <Typography variant="body1">
                      Price: ${beer.price_per_unit}
                    </Typography>
                    <Typography variant="body1">
                      Amount requested: {beer.quantity}
                    </Typography>
                  </Grid>
                  <Grid size={2}>
                    <IconButton
                      color="secondary"
                      onClick={() => updateBeerInRoundPlusOne(beer)}
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </Grid>
                  <Grid size={2}>
                    <IconButton
                      color="secondary"
                      onClick={() => updateBeerInRoundMinusOne(beer)}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Divider className="mb-5" />
              </div>
            ))}
          </Grid>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            endIcon={<SaveIcon />}
            className="mt-10 mb-10"
            onClick={addBeerToRound}
          >
            Save the current round
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default SelectBeer;
