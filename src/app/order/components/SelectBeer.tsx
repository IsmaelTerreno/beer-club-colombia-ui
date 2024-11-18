"use client";
import React, { useEffect } from "react";
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
import {
  addBeerToCurrentRound,
  selectCurrentBeer,
  selectCurrentOrder,
  selectCurrentRound,
  selectItemSubtotalsInCurrentRound,
  selectRounds,
  setCurrentBeer,
  setCurrentOrder,
  setCurrentRound,
  updateBeerQuantityMinusOneInOrderIdAndRoundId,
  updateBeerQuantityPlusOneInOrderIdAndRoundId,
} from "@/lib/features/order/orderSlice";
import { useSelector } from "react-redux";
import { selectCurrentStock, setStock } from "@/lib/features/stock/stockSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Order } from "@/lib/features/app/order.dto";
import { v1 as uuidV1 } from "uuid";

interface SelectBeerProps {
  stock: Stock | null | undefined;
}

const SelectBeer: React.FC<SelectBeerProps> = ({ stock }) => {
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
  const beerRounds = useSelector(selectRounds);
  const currentRound = useSelector(selectCurrentRound);
  const currentRoundItems = useSelector(selectItemSubtotalsInCurrentRound);
  const currentOrder = useSelector(selectCurrentOrder);
  const setBeerSelected = (beer: Beer | null) => dispatch(setCurrentBeer(beer));
  const [open, setOpen] = React.useState(false);
  const [messageApp, setMessageApp] = React.useState<MessageAppProps>({
    message: "",
    severity: "info",
    setOpen,
    open: false,
  });

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
    const beer = currentStock?.beers.find(
      (beer) => beer.id === beerSelected?.id,
    );
    dispatch(addBeerToCurrentRound(beer || null));
  };

  const updateBeerInRoundPlusOne = (beerId: string) => {
    dispatch(
      updateBeerQuantityPlusOneInOrderIdAndRoundId({
        id_order: currentOrder?.id || "",
        id_round: currentRound?.id || "",
        id_beer: beerId,
      }),
    );
  };
  const updateBeerInRoundMinusOne = (beerId: string) => {
    dispatch(
      updateBeerQuantityMinusOneInOrderIdAndRoundId({
        id_order: currentOrder?.id || "",
        id_round: currentRound?.id || "",
        id_beer: beerId,
      }),
    );
  };

  const getBeerLabelById = (id: string) => {
    const beer = currentStock?.beers.find((beer) => beer.id.toString() === id);
    return beer?.name || "";
  };
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
            Selected beers for the current round
          </Typography>
          <Divider className="mb-5" />
        </Grid>
        <Grid>
          <Grid container flexDirection="column">
            {currentRound && currentRound.selected_items.length === 0 && (
              <Typography variant="body1">
                No beers selected for current the round.
              </Typography>
            )}
            {currentRound &&
              currentRound.selected_items.map((item) => (
                <div key={item.id_item + "-item-record"}>
                  <Grid container flexDirection="row">
                    <Grid>
                      <Typography variant="body1">
                        {getBeerLabelById(item.id_item)} - Price: $
                        {item.price_per_unit} - Quantity: {item.quantity}
                      </Typography>
                    </Grid>
                    <Grid>
                      <IconButton
                        aria-label="add"
                        onClick={() => updateBeerInRoundPlusOne(item.id_item)}
                      >
                        <AddCircleIcon />
                      </IconButton>
                      <IconButton
                        aria-label="remove"
                        onClick={() => updateBeerInRoundMinusOne(item.id_item)}
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
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
