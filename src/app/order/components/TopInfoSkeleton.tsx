import React from "react";
import { Box, Skeleton } from "@mui/material";

const TopInfoSkeleton: React.FC = () => {
  return (
    <Box>
      <Skeleton animation="wave" />
    </Box>
  );
};
export default TopInfoSkeleton;
