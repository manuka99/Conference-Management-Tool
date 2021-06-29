import React from "react";
import { Route } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import loadable from "@loadable/component";

// loadable
const Payment = loadable(() => import("../Pages/Public/Payment"), {
  fallback: <ProgressBar />,
});

export const PaymentRoutes = () => {
  return (
    <Route path="/payment">
      <Route path="/" element={<Payment />} />
    </Route>
  );
};
