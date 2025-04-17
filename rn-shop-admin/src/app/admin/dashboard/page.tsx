import React from "react";
import PageComponent from "./page-component";
import { getMonthlyOrders } from "@/actions/orders";
import { getCategoryData } from "@/actions/categories";

const Dashboard = async () => {
  const monthlyOrders = await getMonthlyOrders();
  const categoryData = await getCategoryData();
  return (
    <PageComponent categoryData={categoryData} monthlyOrders={monthlyOrders} />
  );
};

export default Dashboard;
