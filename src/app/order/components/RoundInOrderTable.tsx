import React from "react";
import {
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
import { selectOrderRounds } from "@/lib/features/order/orderSlice";

const RoundInOrderTable: React.FC = () => {
  const orderRounds = useSelector(selectOrderRounds);
  return (
    <>
      {orderRounds && orderRounds.length === 0 && (
        <Typography variant="body1">No rounds in this order yet</Typography>
      )}
      {orderRounds && orderRounds.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="body1">Created at</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">Quantity</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderRounds &&
                orderRounds.map((roundItem) => (
                  <TableRow
                    key={roundItem.id + "-round-order-item"}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">
                      <Typography variant="h6">
                        {roundItem.created_at}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6">
                        {roundItem.selected_items.reduce(
                          (acc, item) => acc + item.quantity,
                          0,
                        )}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default RoundInOrderTable;
