import React from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectCurrentOrder,
  selectCurrentRound,
  selectItemSubtotalsInCurrentRound,
  updateBeerQuantityMinusOneInOrderIdAndRoundId,
  updateBeerQuantityPlusOneInOrderIdAndRoundId,
} from "@/lib/features/order/orderSlice";
import { selectCurrentStock } from "@/lib/features/stock/stockSlice";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useAppDispatch } from "@/lib/hooks";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const CurrentRoundTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentStock = useSelector(selectCurrentStock);
  const currentRound = useSelector(selectCurrentRound);
  const itemSubtotalsInCurrentRound = useSelector(
    selectItemSubtotalsInCurrentRound,
  );
  const getBeerLabelById = (id: string) => {
    const beer = currentStock?.beers.find((beer) => beer.id.toString() === id);
    return beer?.name || "";
  };
  const currentOrder = useSelector(selectCurrentOrder);
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
  const allSubTotal = itemSubtotalsInCurrentRound
    ? itemSubtotalsInCurrentRound
        .reduce(
          (acc, beerItem) => acc + beerItem.price_per_unit * beerItem.quantity,
          0,
        )
        .toLocaleString("en-US")
    : 0;
  return (
    <>
      {currentRound && currentRound.selected_items.length === 0 && (
        <Typography variant="body1">
          No beers selected for current the round.
        </Typography>
      )}
      {currentRound && currentRound.selected_items.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="body1">Beer</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">Quantity</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">Price per unit</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">Sub total</Typography>
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRound &&
                currentRound.selected_items.map((beerItem) => (
                  <TableRow
                    key={beerItem.id_item + "-selected-beer-item"}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant="h6">
                        {getBeerLabelById(beerItem.id_item)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6">{beerItem.quantity}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6">
                        ${beerItem.price_per_unit.toLocaleString("en-US")}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6">
                        $
                        {(
                          beerItem.price_per_unit * beerItem.quantity
                        ).toLocaleString("en-US")}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="secondary"
                        aria-label="add"
                        onClick={() =>
                          updateBeerInRoundPlusOne(beerItem.id_item)
                        }
                      >
                        <AddCircleIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="secondary"
                        aria-label="remove"
                        onClick={() =>
                          updateBeerInRoundMinusOne(beerItem.id_item)
                        }
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography variant="h6">Total</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">
                    ${allSubTotal.toLocaleString("en-US")}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default CurrentRoundTable;
