import React from "react";
import PageComponent from "./page-component";
import { getMonthlyOrders } from "@/actions/orders";
import { getCategoryData } from "@/actions/categories";
import { getLatesUsers } from "@/actions/auth";

const Dashboard = async () => {
  const monthlyOrders = await getMonthlyOrders();
  const categoryData = await getCategoryData();
  const latesUsers = await getLatesUsers();

  return (
    <PageComponent
      latesUsers={latesUsers}
      categoryData={categoryData}
      monthlyOrders={monthlyOrders}
    />
  );
};

export default Dashboard;
