import React from "react";
import ManageOrderForm from "@/app/order/components/ManageOrderForm";
import { Paper } from "@mui/material";
import Link from "next/link";

interface ManageOrderSectionProps {}

const ManageOrderSection: React.FC<ManageOrderSectionProps> = () => {
  return (
    <Paper className="p-8">
      <ManageOrderForm />
      <Link href="/">Back to main</Link>
    </Paper>
  );
};

export default ManageOrderSection;
