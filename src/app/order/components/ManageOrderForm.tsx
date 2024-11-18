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
import MessageApp from "@/app/order/components/MessageApp";
import SaveIcon from "@mui/icons-material/Save";
import { Beer } from "@/lib/features/app/beer.dto";
import {
  addBeerToCurrentRound,
  selectCurrentBeer,
  selectCurrentOrder,
  selectCurrentRound,
  setCurrentBeer,
  setCurrentOrder,
  setCurrentRound,
} from "@/lib/features/order/orderSlice";
import { useSelector } from "react-redux";
import { selectCurrentStock, setStock } from "@/lib/features/stock/stockSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Order } from "@/lib/features/app/order.dto";
import { v1 as uuidV1 } from "uuid";
import {
  selectCurrentMessageDetails,
  setMessageApp,
  setOpen,
} from "@/lib/features/message/messageSlice";
import CurrentRoundTable from "@/app/order/components/CurrentRoundTable";

interface SelectBeerProps {
  stock: Stock | null | undefined;
}

const ManageOrderForm: React.FC<SelectBeerProps> = ({ stock }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setStock({ stock: stock || null }));
    const newId = uuidV1();
    const newBlankOrder: Order = {
      id: newId,
      created: new Date().toLocaleString(),
      paid: false,
      subtotal: 0,
      taxes: 0,
      discounts: 0,
      total_to_pay: 0,
      cash_tendered: 0,
      cash_returned: 0,
      details: "",
      rounds: [],
      option_items: [],
      processed_items: [],
      status: "PENDING",
    };
    dispatch(setCurrentOrder(newBlankOrder));
    const newIdRound = uuidV1();
    const currentRoundBlank = {
      id: newIdRound,
      selected_items: [],
      created_at: new Date().toLocaleString(),
    };
    dispatch(setCurrentRound(currentRoundBlank));
  }, [stock]);
  const currentStock = useSelector(selectCurrentStock);
  const beerSelected = useSelector(selectCurrentBeer);
  const currentRound = useSelector(selectCurrentRound);
  const currentOrder = useSelector(selectCurrentOrder);
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

  const setMessageOpen = (isOpen: boolean) => {
    dispatch(setOpen(isOpen));
  };
  return (
    <>
      <MessageApp
        message={currentMessageDetails.currentMessage || ""}
        severity={currentMessageDetails.severity}
        onClose={() => setMessageOpen(false)}
        open={currentMessageDetails.open}
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
                {currentStock?.last_updated &&
                  new Date(currentStock.last_updated).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Divider className="mb-5" />
        </Grid>
        <Grid>
          <Typography variant="h6" gutterBottom>
            Beers to add to the round
          </Typography>
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
              value={beerSelected ? beerSelected.id : ""}
              label="Select Beer"
              onChange={handleChange}
            >
              {currentStock &&
                currentStock.beers &&
                currentStock.beers.map((beer) => (
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
            Current round details
          </Typography>
          <Divider className="mb-5" />
        </Grid>
        <Grid>
          <CurrentRoundTable />
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

export default ManageOrderForm;
