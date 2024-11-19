import React from "react";
import ManageOrderForm from "@/app/order/components/ManageOrderForm";
import { Paper } from "@mui/material";
import { Stock } from "@/lib/features/app/stock.dto";
import Link from "next/link";

interface ManageOrderSectionProps {
  stock: Stock;
}

const ManageOrderSection: React.FC<ManageOrderSectionProps> = ({ stock }) => {
  return (
    <Paper className="p-8">
      <ManageOrderForm stock={stock} />
      <Link href="/">Back to main</Link>
    </Paper>
  );
};

export default ManageOrderSection;
