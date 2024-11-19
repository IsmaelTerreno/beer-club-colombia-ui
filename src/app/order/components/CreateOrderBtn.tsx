"use client";
import React from "react";
import { Button } from "@mui/material";

const CreateOrderBtn = () => {
  return (
    <div className="">
      <Button
        onClick={() => {
          console.log("Order created");
        }}
        variant="contained"
      >
        Make order
      </Button>
    </div>
  );
};

export default CreateOrderBtn;
