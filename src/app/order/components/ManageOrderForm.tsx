"use client";
import React, { useEffect } from "react";
import { Stock } from "@/lib/features/app/stock.dto";
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
import SaveIcon from "@mui/icons-material/Save";
import { Beer } from "@/lib/features/app/beer.dto";
import {
  addBeerToCurrentRound,
  saveCurrentRoundToRounds,
  selectCurrentBeer,
  selectCurrentOrder,
  selectCurrentRound,
  selectOrderRounds,
  setCurrentBeer,
  setCurrentOrder,
  setCurrentRound,
} from "@/lib/features/order/orderSlice";
import { useSelector } from "react-redux";
import { selectCurrentStock, setStock } from "@/lib/features/stock/stockSlice";
import { useAppDispatch } from "@/lib/hooks";
import {
  selectCurrentMessageDetails,
  setMessageApp,
  setOpen,
} from "@/lib/features/message/messageSlice";
import CurrentRoundTable from "@/app/order/components/CurrentRoundTable";
import {
  getNewBlankOrder,
  getNewBlankRound,
} from "@/lib/features/app/utils/utils";
import MessageApp from "@/app/order/components/MessageApp";

interface SelectBeerProps {
  stock: Stock | null | undefined;
}

const ManageOrderForm: React.FC<SelectBeerProps> = ({ stock }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setStock({ stock: stock || null }));
    dispatch(setCurrentOrder(getNewBlankOrder()));
    dispatch(setCurrentRound(getNewBlankRound()));
  }, [stock]);
  const currentStock = useSelector(selectCurrentStock);
  const beerSelected = useSelector(selectCurrentBeer);
  const currentRound = useSelector(selectCurrentRound);
  const currentOrder = useSelector(selectCurrentOrder);
  const orderRounds = useSelector(selectOrderRounds);
  const setBeerSelected = (beer: Beer | null) => dispatch(setCurrentBeer(beer));
  const currentMessageDetails = useSelector(selectCurrentMessageDetails);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedBeer = currentStock?.beers.find(
      (beer) => beer.id.toString() === event.target.value,
    );
    setBeerSelected(selectedBeer || null);
  };

  const totalBeers =
    (currentStock &&
      currentStock.beers &&
      currentStock.beers.reduce((acc, beer) => acc + beer.quantity, 0)) ||
    0;

  const addBeerToRound = () => {
    if (beerSelected) {
      const isBeerInRound = currentRound?.selected_items.find(
        (item) => item.id_item === beerSelected.id.toString(),
      );
      if (isBeerInRound) {
        dispatch(
          setMessageApp({
            currentMessage: "Beer already in the round.",
            severity: "warning",
            open: true,
          }),
        );
      } else {
        dispatch(addBeerToCurrentRound(beerSelected || null));
        dispatch(
          setMessageApp({
            currentMessage: "Beer added to the round.",
            severity: "success",
            open: true,
          }),
        );
        setBeerSelected(null);
      }
    } else {
      dispatch(
        setMessageApp({
          currentMessage: "Select a beer to add to the round.",
          severity: "error",
          open: true,
        }),
      );
    }
  };
  const saveCurrentRound = () => {
    dispatch(saveCurrentRoundToRounds());
    dispatch(setCurrentOrder(getNewBlankOrder()));
    dispatch(setCurrentRound(getNewBlankRound()));
    dispatch(
      setMessageApp({
        currentMessage: "Round added to the current order.",
        severity: "success",
        open: true,
      }),
    );
  };
  const setMessageOpen = (isOpen: boolean) => {
    dispatch(setOpen(isOpen));
  };
  const isMakeOrderDisabled = orderRounds && orderRounds.length < 1;
  console.log("isMakeOrderDisabled", isMakeOrderDisabled);
  console.log("currentOrder", currentOrder);
  console.log("order.rounds", orderRounds);
  const isSaveRoundDisabled = currentRound?.selected_items.length === 0;
  return (
    <section>
      <Grid container flexDirection="row" justifyContent="space-between">
        <Grid>
          <Typography variant="subtitle1" gutterBottom>
            Total available {totalBeers} beers.
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="subtitle1" gutterBottom>
            Last Stock update at{" "}
            {currentStock?.last_updated &&
              new Date(currentStock.last_updated).toLocaleString()}
          </Typography>
        </Grid>
      </Grid>
      <Divider className="mb-5" />
      <Typography variant="h6" gutterBottom>
        Beers to add to the round
      </Typography>
      <Divider className="mb-5" />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Beer selection</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={beerSelected ? beerSelected.id : ""}
          label="Select Beer"
          onChange={handleChange}
        >
          {currentStock &&
            currentStock.beers &&
            currentStock.beers.map((beer) => (
              <MenuItem key={beer.id + "-menu-item"} value={beer.id.toString()}>
                {beer.name} - Price: ${beer.price_per_unit} - Available:{" "}
                {beer.quantity}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        endIcon={<AddShoppingCartIcon />}
        className="mt-10 mb-10"
        onClick={addBeerToRound}
      >
        Add beer to round
      </Button>
      <Typography variant="h6" gutterBottom>
        Current round details
      </Typography>
      <Divider className="mb-5" />
      <CurrentRoundTable />
      <Button
        variant="contained"
        endIcon={<SaveIcon />}
        className="mt-10 mb-10"
        onClick={saveCurrentRound}
        disabled={isSaveRoundDisabled}
      >
        Save the current round
      </Button>
      <Divider className="mb-5" />
      <Button
        onClick={() => {
          console.log("Order created");
        }}
        variant="contained"
        disabled={isMakeOrderDisabled}
        className="mt-10 mb-10"
      >
        Make order
      </Button>
      <MessageApp
        message={currentMessageDetails.currentMessage || ""}
        severity={currentMessageDetails.severity}
        onClose={() => setMessageOpen(false)}
        open={currentMessageDetails.open}
      />
    </section>
  );
};

export default ManageOrderForm;
