import React from "react";
import ManageOrderForm from "@/app/order/components/ManageOrderForm";
import { Paper } from "@mui/material";

interface ManageOrderSectionProps {}

const ManageOrderSection: React.FC<ManageOrderSectionProps> = () => {
  return (
    <Paper className="p-8">
      <ManageOrderForm />
    </Paper>
  );
};

export default ManageOrderSection;
